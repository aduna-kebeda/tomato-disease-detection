import os
import sys
import numpy as np
import tensorflow as tf
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping, ReduceLROnPlateau
import matplotlib.pyplot as plt
import json
from datetime import datetime

# Add parent directory to path to import utilities
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils.model_utils import ModelManager
from utils.image_processing import ImageProcessor
from model.data_preprocessing import DataPreprocessor

class TomatoDiseaseTrainer:
    """Trainer class for tomato disease detection model."""
    
    def __init__(self, data_dir: str = "data", model_dir: str = "model/saved_models"):
        """
        Initialize the trainer.
        
        Args:
            data_dir: Directory containing the dataset
            model_dir: Directory to save trained models
        """
        self.data_dir = data_dir
        self.model_dir = model_dir
        self.model_manager = ModelManager(model_dir)
        self.image_processor = ImageProcessor()
        self.data_preprocessor = DataPreprocessor(data_dir)
        
        # Training parameters
        self.batch_size = 32
        self.epochs = 50
        self.learning_rate = 0.001
        self.input_shape = (224, 224, 3)
        
    def prepare_data(self):
        """
        Prepare the dataset for training.
        
        Returns:
            Tuple of (train_generator, validation_generator, test_generator)
        """
        print("Preparing data generators...")
        
        # Create data generators
        train_generator, validation_generator = self.model_manager.create_data_generators(
            self.data_dir, self.batch_size
        )
        
        # Create test generator
        test_datagen = tf.keras.preprocessing.image.ImageDataGenerator(rescale=1./255)
        test_generator = test_datagen.flow_from_directory(
            os.path.join(self.data_dir, 'test'),
            target_size=(224, 224),
            batch_size=self.batch_size,
            class_mode='categorical',
            shuffle=False
        )
        
        print(f"Training samples: {train_generator.samples}")
        print(f"Validation samples: {validation_generator.samples}")
        print(f"Test samples: {test_generator.samples}")
        
        return train_generator, validation_generator, test_generator
    
    def create_callbacks(self, model_name: str = "tomato_disease_model"):
        """
        Create training callbacks.
        
        Args:
            model_name: Name for the model
            
        Returns:
            List of callbacks
        """
        # Model checkpoint
        checkpoint_path = os.path.join(self.model_dir, f"{model_name}_best.h5")
        checkpoint = ModelCheckpoint(
            checkpoint_path,
            monitor='val_accuracy',
            save_best_only=True,
            save_weights_only=False,
            mode='max',
            verbose=1
        )
        
        # Early stopping
        early_stopping = EarlyStopping(
            monitor='val_loss',
            patience=10,
            restore_best_weights=True,
            verbose=1
        )
        
        # Learning rate reduction
        reduce_lr = ReduceLROnPlateau(
            monitor='val_loss',
            factor=0.2,
            patience=5,
            min_lr=1e-7,
            verbose=1
        )
        
        return [checkpoint, early_stopping, reduce_lr]
    
    def train_model(self, model_name: str = "tomato_disease_model"):
        """
        Train the tomato disease detection model.
        
        Args:
            model_name: Name for the model
        """
        print("Starting model training...")
        
        # Prepare data
        train_generator, validation_generator, test_generator = self.prepare_data()
        
        # Create model
        print("Creating model...")
        model = self.model_manager.create_model(self.input_shape)
        
        # Print model summary
        print("\nModel Summary:")
        print(self.model_manager.get_model_summary(model))
        
        # Create callbacks
        callbacks = self.create_callbacks(model_name)
        
        # Train the model
        print(f"\nTraining for {self.epochs} epochs...")
        history = model.fit(
            train_generator,
            epochs=self.epochs,
            validation_data=validation_generator,
            callbacks=callbacks,
            verbose=1
        )
        
        # Save the final model
        print("Saving model...")
        model_path = self.model_manager.save_model(model, model_name)
        
        # Convert to TFLite
        print("Converting to TensorFlow Lite...")
        tflite_path = self.model_manager.convert_to_tflite(model, model_name)
        
        # Evaluate the model
        print("Evaluating model...")
        evaluation_results = self.model_manager.evaluate_model(model, test_generator)
        
        # Save evaluation results
        eval_path = os.path.join(self.model_dir, f"{model_name}_evaluation.json")
        with open(eval_path, 'w') as f:
            json.dump(evaluation_results, f, indent=2)
        
        # Plot training history
        self.plot_training_history(history, model_name)
        
        print(f"\nTraining completed!")
        print(f"Model saved to: {model_path}")
        print(f"TFLite model saved to: {tflite_path}")
        print(f"Evaluation results saved to: {eval_path}")
        
        return model, history, evaluation_results
    
    def plot_training_history(self, history, model_name: str):
        """
        Plot training history.
        
        Args:
            history: Training history
            model_name: Name of the model
        """
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 5))
        
        # Plot accuracy
        ax1.plot(history.history['accuracy'], label='Training Accuracy')
        ax1.plot(history.history['val_accuracy'], label='Validation Accuracy')
        ax1.set_title('Model Accuracy')
        ax1.set_xlabel('Epoch')
        ax1.set_ylabel('Accuracy')
        ax1.legend()
        ax1.grid(True)
        
        # Plot loss
        ax2.plot(history.history['loss'], label='Training Loss')
        ax2.plot(history.history['val_loss'], label='Validation Loss')
        ax2.set_title('Model Loss')
        ax2.set_xlabel('Epoch')
        ax2.set_ylabel('Loss')
        ax2.legend()
        ax2.grid(True)
        
        plt.tight_layout()
        
        # Save the plot
        plot_path = os.path.join(self.model_dir, f"{model_name}_training_history.png")
        plt.savefig(plot_path, dpi=300, bbox_inches='tight')
        plt.show()
        
        print(f"Training history plot saved to: {plot_path}")
    
    def fine_tune_model(self, base_model_path: str, model_name: str = "tomato_disease_finetuned"):
        """
        Fine-tune a pre-trained model.
        
        Args:
            base_model_path: Path to the base model
            model_name: Name for the fine-tuned model
        """
        print("Starting model fine-tuning...")
        
        # Load the base model
        model, metadata = self.model_manager.load_model(base_model_path)
        
        # Unfreeze some layers for fine-tuning
        for layer in model.layers[0].layers[-20:]:  # Unfreeze last 20 layers of base model
            layer.trainable = True
        
        # Recompile with lower learning rate
        model.compile(
            optimizer=tf.keras.optimizers.Adam(learning_rate=0.0001),
            loss='categorical_crossentropy',
            metrics=['accuracy']
        )
        
        # Prepare data
        train_generator, validation_generator, test_generator = self.prepare_data()
        
        # Create callbacks
        callbacks = self.create_callbacks(model_name)
        
        # Fine-tune the model
        print("Fine-tuning for 20 epochs...")
        history = model.fit(
            train_generator,
            epochs=20,
            validation_data=validation_generator,
            callbacks=callbacks,
            verbose=1
        )
        
        # Save the fine-tuned model
        model_path = self.model_manager.save_model(model, model_name)
        tflite_path = self.model_manager.convert_to_tflite(model, model_name)
        
        print(f"Fine-tuning completed!")
        print(f"Fine-tuned model saved to: {model_path}")
        print(f"Fine-tuned TFLite model saved to: {tflite_path}")
        
        return model, history

def main():
    """Main function to run the training."""
    # Check if data directory exists
    data_dir = "data"
    if not os.path.exists(data_dir):
        print(f"Data directory '{data_dir}' not found!")
        print("Please create the data directory with the following structure:")
        print("data/")
        print("├── train/")
        print("│   ├── early_blight/")
        print("│   ├── late_blight/")
        print("│   ├── leaf_mold/")
        print("│   ├── septoria_leaf_spot/")
        print("│   ├── spider_mites/")
        print("│   ├── target_spot/")
        print("│   ├── yellow_leaf_curl_virus/")
        print("│   ├── mosaic_virus/")
        print("│   └── healthy/")
        print("└── test/")
        print("    └── [same structure as train]")
        return
    
    # Initialize trainer
    trainer = TomatoDiseaseTrainer(data_dir)
    
    # Validate dataset
    print("Validating dataset...")
    validation_results = trainer.data_preprocessor.validate_dataset(data_dir)
    
    if not validation_results['valid']:
        print("Dataset validation failed!")
        print("Issues found:")
        for issue in validation_results['issues']:
            print(f"  - {issue}")
        return
    
    print("Dataset validation passed!")
    
    # Train the model
    try:
        model, history, evaluation_results = trainer.train_model()
        
        print("\nTraining completed successfully!")
        print(f"Final test accuracy: {evaluation_results['accuracy']:.4f}")
        print(f"Final test loss: {evaluation_results['loss']:.4f}")
        
    except Exception as e:
        print(f"Training failed with error: {str(e)}")
        raise

if __name__ == "__main__":
    main() 