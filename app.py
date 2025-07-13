import os
import sys
import numpy as np
import tensorflow as tf
from flask import Flask, render_template, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
import cv2
from PIL import Image
import json
from datetime import datetime
import base64
import io

# Add current directory to path to import utilities
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from utils.model_utils import ModelManager
from utils.image_processing import ImageProcessor

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['SECRET_KEY'] = 'tomato_disease_detection_secret_key'

# Ensure upload directory exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Initialize model manager and image processor
model_manager = ModelManager()
image_processor = ImageProcessor()

# Global variables for model and metadata
model = None
metadata = {}
tflite_interpreter = None
use_tflite = True  # Set to True to use TensorFlow Lite for faster inference

def load_model():
    """Load the trained model."""
    global model, metadata, tflite_interpreter
    
    try:
        if use_tflite:
            # Try to load TFLite model first
            tflite_interpreter, metadata = model_manager.load_tflite_model()
            print("Loaded TensorFlow Lite model successfully!")
        else:
            # Load regular Keras model
            model, metadata = model_manager.load_model()
            print("Loaded Keras model successfully!")
        
        return True
    except Exception as e:
        print(f"Error loading model: {str(e)}")
        return False

def allowed_file(filename):
    """Check if the uploaded file is allowed."""
    allowed_extensions = {'png', 'jpg', 'jpeg', 'gif', 'bmp'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

def predict_disease(image_path):
    """
    Predict disease from uploaded image.
    
    Args:
        image_path: Path to the uploaded image
        
    Returns:
        Dictionary containing prediction results
    """
    try:
        # Load and preprocess image
        image = image_processor.load_image(image_path)
        
        # Apply image enhancement
        enhanced_image = image_processor.enhance_image(image)
        
        # Preprocess for model input
        processed_image = image_processor.preprocess_image(enhanced_image)
        
        # Make prediction
        if use_tflite and tflite_interpreter is not None:
            # Use TensorFlow Lite for prediction
            predictions, predicted_class = model_manager.predict_with_tflite(
                tflite_interpreter, processed_image.astype(np.float32)
            )
        else:
            # Use regular Keras model
            predictions = model.predict(processed_image)
            predicted_class_idx = np.argmax(predictions[0])
            predicted_class = model_manager.class_names[predicted_class_idx]
            predictions = predictions[0]
        
        # Get confidence scores
        confidence_scores = {}
        for i, class_name in enumerate(model_manager.class_names):
            confidence_scores[class_name] = float(predictions[i])
        
        # Sort by confidence
        sorted_predictions = sorted(
            confidence_scores.items(), 
            key=lambda x: x[1], 
            reverse=True
        )
        
        # Get top 3 predictions
        top_predictions = sorted_predictions[:3]
        
        # Print the predicted class for debugging
        print("Predicted class from model:", predicted_class)

        # Mapping from model class names to frontend keys
        class_name_map = {
            "Tomato___Bacterial_spot": "Bacterial_spot",
            "Tomato___Early_blight": "Early_blight",
            "Tomato___Late_blight": "Late_blight",
            "Tomato___Leaf_Mold": "Leaf_Mold",
            "Tomato___Septoria_leaf_spot": "Septoria_leaf_spot",
            "Tomato___Spider_mites Two-spotted_spider_mite": "Spider_mites",
            "Tomato___Target_Spot": "Target_Spot",
            "Tomato___Tomato_Yellow_Leaf_Curl_Virus": "Tomato_Yellow_Leaf_Curl_Virus",
            "Tomato___Tomato_mosaic_virus": "Tomato_mosaic_virus",
            "Tomato___healthy": "healthy"
        }
        # Map the predicted class to the frontend key
        frontend_class = class_name_map.get(predicted_class, predicted_class)

        # Create result dictionary
        result = {
            'predicted_class': frontend_class,
            'confidence': float(confidence_scores[predicted_class]),
            'all_predictions': confidence_scores,
            'top_predictions': [
                {
                    'class': class_name_map.get(class_name, class_name),
                    'confidence': float(confidence),
                    'percentage': float(confidence * 100)
                }
                for class_name, confidence in top_predictions
            ],
            'timestamp': datetime.now().isoformat()
        }
        
        return result
        
    except Exception as e:
        import traceback
        print(f"Error during prediction: {str(e)}")
        traceback.print_exc()
        return {
            'error': f'Prediction failed: {str(e)}',
            'timestamp': datetime.now().isoformat()
        }

@app.route('/')
def index():
    """Main page."""
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    """Handle image upload and prediction."""
    try:
        # Check if file was uploaded
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400
        
        file = request.files['file']
        
        # Check if file is empty
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Check if file is allowed
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type. Please upload an image.'}), 400
        
        # Save uploaded file
        filename = secure_filename(file.filename)
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f"{timestamp}_{filename}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Make prediction
        result = predict_disease(filepath)
        
        # Add file information to result
        result['uploaded_file'] = filename
        
        return jsonify(result)
        
    except Exception as e:
        import traceback
        print('Error during /predict:', e)
        traceback.print_exc()
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@app.route('/health')
def health():
    """Health check endpoint."""
    model_loaded = model is not None or tflite_interpreter is not None
    return jsonify({
        'status': 'healthy',
        'model_loaded': model_loaded,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/model-info')
def model_info():
    """Get model information."""
    if not metadata:
        return jsonify({'error': 'Model not loaded'}), 500
    
    return jsonify({
        'model_info': metadata,
        'class_names': model_manager.class_names,
        'num_classes': model_manager.num_classes,
        'use_tflite': use_tflite
    })

@app.route('/static/uploads/<filename>')
def uploaded_file(filename):
    """Serve uploaded files."""
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/api/predict', methods=['POST'])
def api_predict():
    """API endpoint for predictions."""
    try:
        # Get image data from request
        data = request.get_json()
        
        if not data or 'image' not in data:
            return jsonify({'error': 'No image data provided'}), 400
        
        # Decode base64 image
        image_data = data['image'].split(',')[1]  # Remove data URL prefix
        image_bytes = base64.b64decode(image_data)
        
        # Convert to PIL Image
        image = Image.open(io.BytesIO(image_bytes))
        
        # Save temporarily
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        temp_filename = f"temp_{timestamp}.jpg"
        temp_filepath = os.path.join(app.config['UPLOAD_FOLDER'], temp_filename)
        image.save(temp_filepath)
        
        # Make prediction
        result = predict_disease(temp_filepath)
        
        # Clean up temporary file
        try:
            os.remove(temp_filepath)
        except:
            pass
        
        return jsonify(result)
        
    except Exception as e:
        return jsonify({'error': f'API error: {str(e)}'}), 500

@app.errorhandler(413)
def too_large(e):
    """Handle file too large error."""
    return jsonify({'error': 'File too large. Maximum size is 16MB.'}), 413

@app.errorhandler(404)
def not_found(e):
    """Handle 404 errors."""
    return jsonify({'error': 'Page not found'}), 404

@app.errorhandler(500)
def internal_error(e):
    """Handle 500 errors."""
    return jsonify({'error': 'Internal server error'}), 500

def create_sample_data():
    """Create sample data directory structure."""
    data_dir = "data"
    if not os.path.exists(data_dir):
        os.makedirs(data_dir)
        
        # Create train and test directories
        for split in ['train', 'test']:
            split_dir = os.path.join(data_dir, split)
            os.makedirs(split_dir, exist_ok=True)
            
            # Create class directories
            for class_name in model_manager.class_names:
                class_dir = os.path.join(split_dir, class_name)
                os.makedirs(class_dir, exist_ok=True)
        
        print(f"Created sample data directory structure at: {data_dir}")
        print("Please add your tomato disease images to the appropriate directories.")

if __name__ == '__main__':
    # Create sample data directory if it doesn't exist
    create_sample_data()
    
    # Load the model
    print("Loading model...")
    if load_model():
        print("Model loaded successfully!")
    else:
        print("Warning: Could not load model. Please train the model first.")
        print("You can still run the application, but predictions will not work.")
    
    # Run the application
    print("Starting Flask application...")
    print("Open your browser and navigate to: http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000) 