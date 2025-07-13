#!/usr/bin/env python3
"""
Demo script for Tomato Disease Detection System
This script creates a sample model for testing the web application.
"""

import os
import sys
import numpy as np
import tensorflow as tf
from tensorflow.keras import layers, models
import json

# Add current directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from utils.model_utils import ModelManager

def create_demo_model():
    """Create a simple demo model for testing."""
    print("Creating demo model...")
    
    # Initialize model manager
    model_manager = ModelManager()
    
    # Create a simple CNN model
    model = models.Sequential([
        layers.Conv2D(32, (3, 3), activation='relu', input_shape=(224, 224, 3)),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.Flatten(),
        layers.Dense(64, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(len(model_manager.class_names), activation='softmax')
    ])
    
    # Compile the model
    model.compile(
        optimizer='adam',
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    
    print("Demo model created successfully!")
    print(f"Model summary:")
    model.summary()
    
    return model, model_manager

def save_demo_model():
    """Save the demo model and convert to TFLite."""
    model, model_manager = create_demo_model()
    
    # Save the model
    model_path = model_manager.save_model(model, "tomato_disease_model")
    print(f"Model saved to: {model_path}")
    
    # Convert to TFLite
    tflite_path = model_manager.convert_to_tflite(model, "tomato_disease_model")
    print(f"TFLite model saved to: {tflite_path}")
    
    # Create sample evaluation results
    create_sample_evaluation()
    
    print("\nDemo setup completed!")
    print("You can now run the web application with: python app.py")

def create_sample_evaluation():
    """Create sample evaluation results."""
    evaluation_results = {
        "model_name": "tomato_disease_model",
        "accuracy": 0.85,
        "precision": {
            "per_class": [0.88, 0.82, 0.87, 0.83, 0.86, 0.84, 0.89, 0.81, 0.90, 0.85],
            "macro": 0.86,
            "weighted": 0.85
        },
        "recall": {
            "per_class": [0.85, 0.83, 0.86, 0.82, 0.87, 0.84, 0.88, 0.80, 0.91, 0.86],
            "macro": 0.85,
            "weighted": 0.85
        },
        "f1_score": {
            "per_class": [0.86, 0.82, 0.86, 0.82, 0.86, 0.84, 0.88, 0.80, 0.90, 0.85],
            "macro": 0.85,
            "weighted": 0.85
        },
        "support": [100, 95, 105, 90, 110, 85, 115, 80, 120, 95],
        "confusion_matrix": [
            [85, 5, 3, 2, 1, 1, 1, 1, 1, 0],
            [3, 79, 4, 2, 2, 1, 1, 1, 2, 0],
            [2, 3, 90, 3, 2, 1, 1, 1, 2, 0],
            [2, 2, 3, 74, 3, 2, 1, 1, 2, 0],
            [1, 2, 2, 3, 96, 2, 1, 1, 2, 0],
            [1, 1, 2, 2, 2, 71, 2, 1, 3, 0],
            [1, 1, 1, 2, 2, 2, 101, 2, 3, 0],
            [1, 1, 1, 1, 2, 2, 2, 64, 6, 0],
            [1, 1, 1, 1, 2, 2, 2, 3, 109, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 81]
        ],
        "class_names": [
            'Tomato_mosaic_virus',
            'Target_Spot',
            'Bacterial_spot',
            'Tomato_Yellow_Leaf_Curl_Virus',
            'Late_blight',
            'Leaf_Mold',
            'Early_blight',
            'Spider_mites Two-spotted_spider_mite',
            'Tomato___healthy',
            'Septoria_leaf_spot'
        ],
        "predictions": [],
        "true_labels": [],
        "predicted_labels": []
    }
    
    # Save evaluation results
    eval_path = os.path.join("model/saved_models", "tomato_disease_model_evaluation.json")
    with open(eval_path, 'w') as f:
        json.dump(evaluation_results, f, indent=2)
    
    print(f"Sample evaluation results saved to: {eval_path}")

def create_sample_data_structure():
    """Create sample data directory structure."""
    data_dir = "data"
    class_names = [
        'Tomato_mosaic_virus',
        'Target_Spot',
        'Bacterial_spot',
        'Tomato_Yellow_Leaf_Curl_Virus',
        'Late_blight',
        'Leaf_Mold',
        'Early_blight',
        'Spider_mites Two-spotted_spider_mite',
        'Tomato___healthy',
        'Septoria_leaf_spot'
    ]
    
    # Create directory structure
    for split in ['train', 'test']:
        split_dir = os.path.join(data_dir, split)
        os.makedirs(split_dir, exist_ok=True)
        
        for class_name in class_names:
            class_dir = os.path.join(split_dir, class_name)
            os.makedirs(class_dir, exist_ok=True)
    
    print(f"Sample data directory structure created at: {data_dir}")
    print("Please add your tomato disease images to the appropriate directories.")

def main():
    """Main function."""
    print("Tomato Disease Detection - Demo Setup")
    print("=" * 50)
    
    # Create directories
    os.makedirs("model/saved_models", exist_ok=True)
    os.makedirs("static/uploads", exist_ok=True)
    
    # Create sample data structure
    create_sample_data_structure()
    
    # Create and save demo model
    save_demo_model()
    
    print("\n" + "=" * 50)
    print("Demo setup completed successfully!")
    print("\nNext steps:")
    print("1. Run the web application: python app.py")
    print("2. Open your browser and go to: http://localhost:5000")
    print("3. Upload tomato leaf images for disease detection")
    print("\nNote: This is a demo model. For production use, train with real data.")

if __name__ == "__main__":
    main() 