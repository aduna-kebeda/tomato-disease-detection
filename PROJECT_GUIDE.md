# Tomato Disease Detection System - Project Guide

## Overview

This is a comprehensive machine learning system for detecting tomato diseases using Convolutional Neural Networks (CNN) with transfer learning. The system includes a Flask web application with a modern Bootstrap UI for real-time image upload and instant predictions.

## Features

- **CNN-based Disease Detection**: Uses transfer learning with EfficientNetB0 for improved accuracy
- **Real-time Web Interface**: Flask web application with responsive Bootstrap UI
- **Multiple Disease Classes**: Detects 8 tomato diseases plus healthy leaves
- **Optimized Inference**: TensorFlow Lite integration for faster predictions
- **Performance Metrics**: Comprehensive evaluation with precision, recall, and F1-score
- **Image Preprocessing**: OpenCV-based image processing for optimal model input

## Project Structure

```
tomato/
├── app.py                          # Flask web application
├── demo.py                         # Demo setup script
├── setup.py                        # Project setup script
├── requirements.txt                # Python dependencies
├── README.md                       # Project documentation
├── PROJECT_GUIDE.md               # This guide
├── model/
│   ├── train_model.py             # Model training script
│   ├── model_evaluation.py        # Performance evaluation
│   ├── data_preprocessing.py      # Data preprocessing utilities
│   └── saved_models/              # Trained model files
├── static/
│   ├── css/                       # Custom CSS files
│   ├── js/                        # Custom JavaScript files
│   └── uploads/                   # Uploaded images
├── templates/
│   └── index.html                 # Main web interface
├── utils/
│   ├── image_processing.py        # Image processing utilities
│   └── model_utils.py             # Model utility functions
└── data/                          # Dataset directory
    ├── train/                     # Training images
    └── test/                      # Test images
```

## Quick Start

### Option 1: Automated Setup (Recommended)

1. **Clone or download the project**
2. **Run the setup script**:
   ```bash
   python setup.py
   ```
3. **Start the web application**:
   ```bash
   python app.py
   ```
4. **Open your browser** and go to: `http://localhost:5000`

### Option 2: Manual Setup

1. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Create demo model** (for testing without real data):
   ```bash
   python demo.py
   ```

3. **Start the web application**:
   ```bash
   python app.py
   ```

4. **Open your browser** and go to: `http://localhost:5000`

## Detailed Usage

### 1. Setting Up Your Dataset

For training with real data, organize your images in the following structure:

```
data/
├── train/
│   ├── early_blight/
│   │   ├── image1.jpg
│   │   ├── image2.jpg
│   │   └── ...
│   ├── late_blight/
│   │   └── ...
│   ├── leaf_mold/
│   │   └── ...
│   ├── septoria_leaf_spot/
│   │   └── ...
│   ├── spider_mites/
│   │   └── ...
│   ├── target_spot/
│   │   └── ...
│   ├── yellow_leaf_curl_virus/
│   │   └── ...
│   ├── mosaic_virus/
│   │   └── ...
│   └── healthy/
│       └── ...
└── test/
    └── [same structure as train]
```

**Supported image formats**: JPG, JPEG, PNG, GIF, BMP

### 2. Training the Model

Once you have your dataset ready:

```bash
python model/train_model.py
```

This will:
- Load and preprocess your dataset
- Create a CNN model with transfer learning
- Train the model for 50 epochs
- Save the trained model and convert to TensorFlow Lite
- Generate evaluation metrics and plots

### 3. Evaluating Model Performance

```bash
python model/model_evaluation.py
```

This will:
- Load the trained model
- Evaluate on test data
- Generate precision, recall, and F1-score metrics
- Create confusion matrix and performance plots
- Save detailed evaluation report

### 4. Using the Web Application

1. **Start the application**:
   ```bash
   python app.py
   ```

2. **Open your browser** and navigate to `http://localhost:5000`

3. **Upload an image**:
   - Drag and drop an image onto the upload area
   - Or click to browse and select an image
   - Click "Analyze Image" to get predictions

4. **View results**:
   - See the predicted disease class
   - View confidence scores
   - Get detailed disease information
   - Read treatment recommendations

## Disease Classes

The system can detect the following tomato diseases:

1. **Early Blight** - Fungal disease with dark brown spots
2. **Late Blight** - Devastating fungal disease
3. **Leaf Mold** - Fungal disease in humid conditions
4. **Septoria Leaf Spot** - Fungal disease with small spots
5. **Spider Mites** - Tiny arachnids causing stippling
6. **Target Spot** - Fungal disease with target-like lesions
7. **Yellow Leaf Curl Virus** - Viral disease from whiteflies
8. **Mosaic Virus** - Viral disease with mottled patterns
9. **Healthy** - No disease detected

## Model Architecture

- **Base Model**: EfficientNetB0 (transfer learning)
- **Input Size**: 224x224x3 pixels
- **Output**: 9 classes (8 diseases + healthy)
- **Optimization**: Adam optimizer with learning rate scheduling
- **Regularization**: Dropout and data augmentation
- **Inference**: TensorFlow Lite for optimized performance

## Performance Metrics

The system evaluates model performance using:

- **Accuracy**: Overall classification accuracy
- **Precision**: Accuracy of positive predictions
- **Recall**: Ability to find all positive cases
- **F1-Score**: Harmonic mean of precision and recall
- **Confusion Matrix**: Detailed classification performance

## API Endpoints

The web application provides the following API endpoints:

- `GET /`: Main web interface
- `POST /predict`: Image prediction endpoint
- `GET /health`: Health check endpoint
- `GET /model-info`: Model information endpoint
- `POST /api/predict`: API endpoint for predictions

## Customization

### Modifying Model Architecture

Edit `utils/model_utils.py` to change the model architecture:

```python
def create_model(self, input_shape=(224, 224, 3)):
    # Modify the model architecture here
    base_model = EfficientNetB0(...)
    # Add your custom layers
```

### Adding New Disease Classes

1. Update the class names in `utils/model_utils.py`
2. Add corresponding directories in your dataset
3. Retrain the model

### Customizing the Web Interface

Edit `templates/index.html` to modify the UI:
- Change colors and styling
- Add new features
- Modify the layout

## Troubleshooting

### Common Issues

1. **Model not loading**:
   - Ensure you've run `python demo.py` or trained a model
   - Check that model files exist in `model/saved_models/`

2. **Dependencies not installed**:
   - Run `pip install -r requirements.txt`
   - Check Python version (3.8+ required)

3. **Memory issues**:
   - Reduce batch size in training
   - Use smaller image sizes
   - Enable GPU if available

4. **Poor prediction accuracy**:
   - Ensure dataset quality and balance
   - Increase training epochs
   - Add more data augmentation
   - Try different model architectures

### Performance Optimization

1. **GPU Usage**: Install TensorFlow-GPU for faster training
2. **Batch Processing**: Adjust batch size based on available memory
3. **Model Optimization**: Use TensorFlow Lite for faster inference
4. **Image Preprocessing**: Optimize image size and quality

## Development

### Adding New Features

1. **New preprocessing steps**: Edit `utils/image_processing.py`
2. **New model architectures**: Modify `utils/model_utils.py`
3. **New evaluation metrics**: Update `model/model_evaluation.py`
4. **UI improvements**: Edit `templates/index.html`

### Testing

1. **Unit tests**: Add tests for utility functions
2. **Integration tests**: Test the complete pipeline
3. **Performance tests**: Benchmark model inference time

## Deployment

### Local Deployment

1. Install dependencies
2. Train or load model
3. Run `python app.py`
4. Access via `http://localhost:5000`

### Production Deployment

1. **Use a production WSGI server**:
   ```bash
   pip install gunicorn
   gunicorn -w 4 -b 0.0.0.0:5000 app:app
   ```

2. **Set up reverse proxy** (nginx):
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://127.0.0.1:5000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

3. **Environment variables**:
   ```bash
   export FLASK_ENV=production
   export FLASK_DEBUG=0
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Dataset: PlantVillage dataset
- Pre-trained models: TensorFlow Hub
- UI Framework: Bootstrap
- Machine Learning: TensorFlow/Keras

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review the code documentation
3. Create an issue on the repository
4. Contact the development team

---

**Happy coding and happy farming! 🌱🍅** 