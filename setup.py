#!/usr/bin/env python3
"""
Setup script for Tomato Disease Detection System
This script installs dependencies and sets up the project structure.
"""

import os
import sys
import subprocess
import platform

def check_python_version():
    """Check if Python version is compatible."""
    if sys.version_info < (3, 8):
        print("Error: Python 3.8 or higher is required.")
        print(f"Current version: {sys.version}")
        return False
    print(f"Python version: {sys.version}")
    return True

def install_dependencies():
    """Install required dependencies."""
    print("Installing dependencies...")
    
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("Dependencies installed successfully!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error installing dependencies: {e}")
        return False

def create_directories():
    """Create necessary directories."""
    directories = [
        "model/saved_models",
        "static/css",
        "static/js", 
        "static/uploads",
        "templates",
        "utils",
        "data/train",
        "data/test"
    ]
    
    class_names = [
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
    
    # Create main directories
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
        print(f"Created directory: {directory}")
    
    # Create class directories
    for split in ['train', 'test']:
        for class_name in class_names:
            class_dir = os.path.join("data", split, class_name)
            os.makedirs(class_dir, exist_ok=True)
            print(f"Created directory: {class_dir}")

def check_tensorflow():
    """Check if TensorFlow is properly installed."""
    try:
        import tensorflow as tf
        print(f"TensorFlow version: {tf.__version__}")
        
        # Test GPU availability
        gpus = tf.config.list_physical_devices('GPU')
        if gpus:
            print(f"GPU devices found: {len(gpus)}")
            for gpu in gpus:
                print(f"  - {gpu}")
        else:
            print("No GPU devices found. Using CPU.")
        
        return True
    except ImportError:
        print("Error: TensorFlow not found. Please install dependencies first.")
        return False

def run_demo_setup():
    """Run the demo setup."""
    try:
        print("Setting up demo model...")
        subprocess.check_call([sys.executable, "demo.py"])
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error running demo setup: {e}")
        return False

def main():
    """Main setup function."""
    print("Tomato Disease Detection System - Setup")
    print("=" * 50)
    
    # Check Python version
    if not check_python_version():
        return
    
    # Create directories
    print("\nCreating project directories...")
    create_directories()
    
    # Install dependencies
    print("\nInstalling dependencies...")
    if not install_dependencies():
        print("Failed to install dependencies. Please check your internet connection and try again.")
        return
    
    # Check TensorFlow
    print("\nChecking TensorFlow installation...")
    if not check_tensorflow():
        print("TensorFlow installation failed. Please check the error messages above.")
        return
    
    # Run demo setup
    print("\nSetting up demo model...")
    if run_demo_setup():
        print("Demo setup completed successfully!")
    else:
        print("Demo setup failed. You can still run the application manually.")
    
    print("\n" + "=" * 50)
    print("Setup completed successfully!")
    print("\nNext steps:")
    print("1. Add your tomato disease images to the data/ directory")
    print("2. Train the model: python model/train_model.py")
    print("3. Run the web application: python app.py")
    print("4. Open your browser and go to: http://localhost:5000")
    print("\nFor quick testing without training:")
    print("1. Run: python demo.py")
    print("2. Run: python app.py")
    print("3. Open: http://localhost:5000")

if __name__ == "__main__":
    main() 