# Tomato Disease Detection Using Machine Learning

A comprehensive machine learning system for detecting tomato diseases using Convolutional Neural Networks (CNN) with transfer learning, built with Python, TensorFlow, and Flask.

## Features

- **CNN-based Disease Detection**: Uses transfer learning with pre-trained models for improved accuracy
- **Real-time Web Interface**: Flask web application with responsive Bootstrap UI
- **Multiple Disease Classes**: Detects various tomato diseases including:
  - Tomato Mosaic Virus
  - Target Spot
  - Bacterial Spot
  - Tomato Yellow Leaf Curl Virus
  - Late Blight
  - Leaf Mold
  - Early Blight
  - Spider Mites (Two-spotted)
  - Healthy Tomato
  - Septoria Leaf Spot
- **Optimized Inference**: TensorFlow Lite integration for faster predictions
- **Performance Metrics**: Comprehensive evaluation with precision, recall, and F1-score
- **Image Preprocessing**: OpenCV-based image processing for optimal model input

## Project Structure

```
tomato/
├── app.py                          # Flask web application
├── model/
│   ├── train_model.py             # Model training script
│   ├── model_evaluation.py        # Performance evaluation
│   ├── data_preprocessing.py      # Data preprocessing utilities
│   └── saved_models/              # Trained model files
├── static/
│   ├── css/
│   ├── js/
│   └── uploads/                   # Uploaded images
├── templates/
│   └── index.html                 # Main web interface
├── utils/
│   ├── image_processing.py        # Image processing utilities
│   └── model_utils.py             # Model utility functions
├── requirements.txt               # Python dependencies
└── README.md                     # Project documentation
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tomato
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

## Usage

### Training the Model

1. Prepare your dataset in the following structure:
```
data/
├── train/
│   ├── Tomato_mosaic_virus/
│   ├── Target_Spot/
│   ├── Bacterial_spot/
│   ├── Tomato_Yellow_Leaf_Curl_Virus/
│   ├── Late_blight/
│   ├── Leaf_Mold/
│   ├── Early_blight/
│   ├── Spider_mites Two-spotted_spider_mite/
│   ├── Tomato___healthy/
│   └── Septoria_leaf_spot/
└── test/
    └── [same structure as train]
```

2. Train the model:
```bash
python model/train_model.py
```

### Running the Web Application

1. Start the Flask application:
```bash
python app.py
```

2. Open your browser and navigate to `http://localhost:5000`

3. Upload a tomato leaf image and get instant disease predictions

## Model Architecture

- **Base Model**: EfficientNetB0 (transfer learning)
- **Input Size**: 224x224x3
- **Output**: 10 classes (9 diseases + healthy)
- **Optimization**: Adam optimizer with learning rate scheduling
- **Regularization**: Dropout and data augmentation

## Performance Metrics

The model is evaluated using:
- **Precision**: Accuracy of positive predictions
- **Recall**: Ability to find all positive cases
- **F1-Score**: Harmonic mean of precision and recall
- **Confusion Matrix**: Detailed classification performance

## Technologies Used

- **Backend**: Python, Flask
- **Machine Learning**: TensorFlow, Keras
- **Image Processing**: OpenCV, PIL
- **Frontend**: HTML, CSS, Bootstrap, JavaScript
- **Model Optimization**: TensorFlow Lite
- **Data Analysis**: NumPy, Pandas, Matplotlib, Seaborn

## API Endpoints

- `GET /`: Main web interface
- `POST /predict`: Image prediction endpoint
- `GET /health`: Health check endpoint

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