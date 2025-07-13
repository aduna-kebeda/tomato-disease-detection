import cv2
import numpy as np
from PIL import Image
import os
from typing import Tuple, Optional

class ImageProcessor:
    """Image processing utilities for tomato disease detection."""
    
    def __init__(self, target_size: Tuple[int, int] = (224, 224)):
        """
        Initialize the image processor.
        
        Args:
            target_size: Target size for image resizing (width, height)
        """
        self.target_size = target_size
        
    def load_image(self, image_path: str) -> np.ndarray:
        """
        Load and preprocess an image for model input.
        
        Args:
            image_path: Path to the image file
            
        Returns:
            Preprocessed image as numpy array
        """
        # Load image using OpenCV
        image = cv2.imread(image_path)
        if image is None:
            raise ValueError(f"Could not load image from {image_path}")
        
        # Convert BGR to RGB
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        
        return image
    
    def preprocess_image(self, image: np.ndarray) -> np.ndarray:
        """
        Preprocess image for model input.
        
        Args:
            image: Input image as numpy array
            
        Returns:
            Preprocessed image ready for model input
        """
        # Resize image
        image = cv2.resize(image, self.target_size)
        
        # Normalize pixel values to [0, 1]
        image = image.astype(np.float32) / 255.0
        
        # Add batch dimension
        image = np.expand_dims(image, axis=0)
        
        return image
    
    def enhance_image(self, image: np.ndarray) -> np.ndarray:
        """
        Apply image enhancement techniques.
        
        Args:
            image: Input image
            
        Returns:
            Enhanced image
        """
        # Convert to LAB color space for better enhancement
        lab = cv2.cvtColor(image, cv2.COLOR_RGB2LAB)
        
        # Apply CLAHE (Contrast Limited Adaptive Histogram Equalization)
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
        lab[:, :, 0] = clahe.apply(lab[:, :, 0])
        
        # Convert back to RGB
        enhanced = cv2.cvtColor(lab, cv2.COLOR_LAB2RGB)
        
        return enhanced
    
    def segment_leaf(self, image: np.ndarray) -> np.ndarray:
        """
        Basic leaf segmentation to focus on the leaf area.
        
        Args:
            image: Input image
            
        Returns:
            Segmented image with focus on leaf
        """
        # Convert to HSV for better color-based segmentation
        hsv = cv2.cvtColor(image, cv2.COLOR_RGB2HSV)
        
        # Define green color range for leaves
        lower_green = np.array([35, 20, 20])
        upper_green = np.array([85, 255, 255])
        
        # Create mask for green regions
        mask = cv2.inRange(hsv, lower_green, upper_green)
        
        # Apply morphological operations to clean the mask
        kernel = np.ones((5, 5), np.uint8)
        mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
        mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
        
        # Apply mask to original image
        segmented = cv2.bitwise_and(image, image, mask=mask)
        
        return segmented
    
    def augment_image(self, image: np.ndarray) -> np.ndarray:
        """
        Apply data augmentation techniques.
        
        Args:
            image: Input image
            
        Returns:
            Augmented image
        """
        # Random rotation
        angle = np.random.uniform(-15, 15)
        height, width = image.shape[:2]
        center = (width // 2, height // 2)
        rotation_matrix = cv2.getRotationMatrix2D(center, angle, 1.0)
        rotated = cv2.warpAffine(image, rotation_matrix, (width, height))
        
        # Random brightness adjustment
        brightness = np.random.uniform(0.8, 1.2)
        brightened = cv2.convertScaleAbs(rotated, alpha=brightness, beta=0)
        
        return brightened
    
    def save_processed_image(self, image: np.ndarray, output_path: str) -> None:
        """
        Save processed image to file.
        
        Args:
            image: Image to save
            output_path: Output file path
        """
        # Convert back to uint8 if needed
        if image.dtype == np.float32:
            image = (image * 255).astype(np.uint8)
        
        # Save using PIL for better format support
        pil_image = Image.fromarray(image)
        pil_image.save(output_path)
    
    def create_thumbnail(self, image: np.ndarray, size: Tuple[int, int] = (100, 100)) -> np.ndarray:
        """
        Create a thumbnail version of the image.
        
        Args:
            image: Input image
            size: Thumbnail size
            
        Returns:
            Thumbnail image
        """
        return cv2.resize(image, size)
    
    def validate_image(self, image_path: str) -> bool:
        """
        Validate if the image file is valid and can be processed.
        
        Args:
            image_path: Path to the image file
            
        Returns:
            True if image is valid, False otherwise
        """
        try:
            # Check if file exists
            if not os.path.exists(image_path):
                return False
            
            # Try to load the image
            image = cv2.imread(image_path)
            if image is None:
                return False
            
            # Check if image has valid dimensions
            if image.shape[0] < 10 or image.shape[1] < 10:
                return False
            
            return True
            
        except Exception:
            return False 