import tensorflow as tf
import numpy as np
import os
import json
from typing import Dict, List, Tuple, Optional
import tensorflow_hub as hub
from tensorflow.keras import layers, models, optimizers
from tensorflow.keras.applications import EfficientNetB0
from tensorflow.keras.preprocessing.image import ImageDataGenerator

class ModelManager:
    """Utility class for managing the tomato disease detection model."""
    
    def __init__(self, model_path: str = "model/saved_models"):
        """
        Initialize the model manager.
        
        Args:
            model_path: Path to save/load model files
        """
        self.model_path = model_path
        self.class_names = [
            'Tomato___Bacterial_spot',
            'Tomato___Early_blight',
            'Tomato___healthy',
            'Tomato___Late_blight',
            'Tomato___Leaf_Mold',
            'Tomato___Septoria_leaf_spot',
            'Tomato___Spider_mites Two-spotted_spider_mite',
            'Tomato___Target_Spot',
            'Tomato___Tomato_mosaic_virus',
            'Tomato___Tomato_Yellow_Leaf_Curl_Virus'
        ]
        self.num_classes = len(self.class_names)
        
        # Create model directory if it doesn't exist
        os.makedirs(model_path, exist_ok=True)
    
    def create_model(self, input_shape: Tuple[int, int, int] = (224, 224, 3)) -> tf.keras.Model:
        """
        Create the CNN model with transfer learning.
        
        Args:
            input_shape: Input image shape (height, width, channels)
            
        Returns:
            Compiled Keras model
        """
        # Use EfficientNetB0 as base model
        base_model = EfficientNetB0(
            weights='imagenet',
            include_top=False,
            input_shape=input_shape
        )
        
        # Freeze the base model layers
        base_model.trainable = False
        
        # Create the model
        model = models.Sequential([
            base_model,
            layers.GlobalAveragePooling2D(),
            layers.Dropout(0.5),
            layers.Dense(512, activation='relu'),
            layers.Dropout(0.3),
            layers.Dense(256, activation='relu'),
            layers.Dropout(0.2),
            layers.Dense(self.num_classes, activation='softmax')
        ])
        
        # Compile the model
        model.compile(
            optimizer=optimizers.Adam(learning_rate=0.001),
            loss='categorical_crossentropy',
            metrics=['accuracy']
        )
        
        return model
    
    def create_data_generators(self, data_dir: str, batch_size: int = 32) -> Tuple[tf.keras.preprocessing.image.DirectoryIterator, tf.keras.preprocessing.image.DirectoryIterator]:
        """
        Create data generators for training and validation.
        
        Args:
            data_dir: Directory containing the dataset
            batch_size: Batch size for training
            
        Returns:
            Tuple of (train_generator, validation_generator)
        """
        train_dir = os.path.join(data_dir, 'train')
        val_dir = os.path.join(data_dir, 'val')
        if os.path.exists(val_dir) and any(os.path.isdir(os.path.join(val_dir, d)) for d in os.listdir(val_dir)):
            print("[INFO] Using separate 'train' and 'val' directories for data generators.")
            train_datagen = tf.keras.preprocessing.image.ImageDataGenerator(
                rescale=1./255,
                rotation_range=20,
                width_shift_range=0.2,
                height_shift_range=0.2,
                shear_range=0.2,
                zoom_range=0.2,
                horizontal_flip=True,
                fill_mode='nearest'
            )
            val_datagen = tf.keras.preprocessing.image.ImageDataGenerator(rescale=1./255)
            train_generator = train_datagen.flow_from_directory(
                train_dir,
                target_size=(224, 224),
                batch_size=batch_size,
                class_mode='categorical',
                shuffle=True
            )
            validation_generator = val_datagen.flow_from_directory(
                val_dir,
                target_size=(224, 224),
                batch_size=batch_size,
                class_mode='categorical',
                shuffle=False
            )
        else:
            print("[INFO] Using validation_split on 'train' directory for data generators.")
            train_datagen = tf.keras.preprocessing.image.ImageDataGenerator(
                rescale=1./255,
                rotation_range=20,
                width_shift_range=0.2,
                height_shift_range=0.2,
                shear_range=0.2,
                zoom_range=0.2,
                horizontal_flip=True,
                fill_mode='nearest',
                validation_split=0.2
            )
            val_datagen = tf.keras.preprocessing.image.ImageDataGenerator(
                rescale=1./255,
                validation_split=0.2
            )
            train_generator = train_datagen.flow_from_directory(
                train_dir,
                target_size=(224, 224),
                batch_size=batch_size,
                class_mode='categorical',
                subset='training',
                shuffle=True
            )
            validation_generator = val_datagen.flow_from_directory(
                train_dir,
                target_size=(224, 224),
                batch_size=batch_size,
                class_mode='categorical',
                subset='validation',
                shuffle=False
            )
        return train_generator, validation_generator
    
    def save_model(self, model: tf.keras.Model, model_name: str = "tomato_disease_model") -> str:
        """
        Save the trained model.
        
        Args:
            model: Trained Keras model
            model_name: Name for the saved model
            
        Returns:
            Path to the saved model
        """
        model_file = os.path.join(self.model_path, f"{model_name}.h5")
        model.save(model_file)
        
        # Save model metadata
        metadata = {
            "class_names": self.class_names,
            "num_classes": self.num_classes,
            "input_shape": model.input_shape[1:],
            "model_name": model_name
        }
        
        metadata_file = os.path.join(self.model_path, f"{model_name}_metadata.json")
        with open(metadata_file, 'w') as f:
            json.dump(metadata, f, indent=2)
        
        return model_file
    
    def load_model(self, model_name: str = "tomato_disease_model") -> Tuple[tf.keras.Model, Dict]:
        """
        Load a trained model.
        
        Args:
            model_name: Name of the model to load
            
        Returns:
            Tuple of (loaded_model, metadata)
        """
        model_file = os.path.join(self.model_path, f"{model_name}.h5")
        metadata_file = os.path.join(self.model_path, f"{model_name}_metadata.json")
        
        if not os.path.exists(model_file):
            raise FileNotFoundError(f"Model file not found: {model_file}")
        
        # Load the model
        model = tf.keras.models.load_model(model_file)
        
        # Load metadata
        metadata = {}
        if os.path.exists(metadata_file):
            with open(metadata_file, 'r') as f:
                metadata = json.load(f)
        
        return model, metadata
    
    def convert_to_tflite(self, model: tf.keras.Model, model_name: str = "tomato_disease_model") -> str:
        """
        Convert the model to TensorFlow Lite format for optimized inference.
        
        Args:
            model: Keras model to convert
            model_name: Name for the saved model
            
        Returns:
            Path to the saved TFLite model
        """
        # Convert to TFLite
        converter = tf.lite.TFLiteConverter.from_keras_model(model)
        converter.optimizations = [tf.lite.Optimize.DEFAULT]
        tflite_model = converter.convert()
        
        # Save the TFLite model
        tflite_file = os.path.join(self.model_path, f"{model_name}.tflite")
        with open(tflite_file, 'wb') as f:
            f.write(tflite_model)
        
        return tflite_file
    
    def load_tflite_model(self, model_name: str = "tomato_disease_model") -> Tuple[tf.lite.Interpreter, Dict]:
        """
        Load a TensorFlow Lite model.
        
        Args:
            model_name: Name of the model to load
            
        Returns:
            Tuple of (interpreter, metadata)
        """
        tflite_file = os.path.join(self.model_path, f"{model_name}.tflite")
        metadata_file = os.path.join(self.model_path, f"{model_name}_metadata.json")
        
        if not os.path.exists(tflite_file):
            raise FileNotFoundError(f"TFLite model file not found: {tflite_file}")
        
        # Load the TFLite model
        interpreter = tf.lite.Interpreter(model_path=tflite_file)
        interpreter.allocate_tensors()
        
        # Load metadata
        metadata = {}
        if os.path.exists(metadata_file):
            with open(metadata_file, 'r') as f:
                metadata = json.load(f)
        
        return interpreter, metadata
    
    def predict_with_tflite(self, interpreter: tf.lite.Interpreter, image: np.ndarray) -> Tuple[np.ndarray, str]:
        """
        Make prediction using TensorFlow Lite model.
        
        Args:
            interpreter: TFLite interpreter
            image: Preprocessed image
            
        Returns:
            Tuple of (predictions, predicted_class)
        """
        # Get input and output details
        input_details = interpreter.get_input_details()
        output_details = interpreter.get_output_details()
        
        # Set input tensor
        interpreter.set_tensor(input_details[0]['index'], image)
        
        # Run inference
        interpreter.invoke()
        
        # Get output tensor
        predictions = interpreter.get_tensor(output_details[0]['index'])
        
        # Get predicted class
        predicted_class_idx = np.argmax(predictions[0])
        predicted_class = self.class_names[predicted_class_idx]
        
        return predictions[0], predicted_class
    
    def get_model_summary(self, model: tf.keras.Model) -> str:
        """
        Get a summary of the model architecture.
        
        Args:
            model: Keras model
            
        Returns:
            Model summary as string
        """
        summary = []
        model.summary(print_fn=lambda x: summary.append(x))
        return '\n'.join(summary)
    
    def evaluate_model(self, model: tf.keras.Model, test_generator: ImageDataGenerator) -> Dict:
        """
        Evaluate the model performance.
        
        Args:
            model: Trained model
            test_generator: Test data generator
            
        Returns:
            Dictionary containing evaluation metrics
        """
        # Evaluate the model
        evaluation = model.evaluate(test_generator, verbose=1)
        
        # Get predictions
        predictions = model.predict(test_generator)
        y_pred = np.argmax(predictions, axis=1)
        y_true = test_generator.classes
        
        # Calculate metrics
        from sklearn.metrics import classification_report, confusion_matrix
        
        report = classification_report(y_true, y_pred, target_names=self.class_names, output_dict=True)
        conf_matrix = confusion_matrix(y_true, y_pred)
        
        return {
            'loss': evaluation[0],
            'accuracy': evaluation[1],
            'classification_report': report,
            'confusion_matrix': conf_matrix.tolist(),
            'predictions': predictions.tolist()
        } 