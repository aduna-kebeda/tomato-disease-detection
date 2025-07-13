import os
import shutil
import random
import numpy as np
from typing import List, Tuple, Dict
import cv2
from PIL import Image
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split

class DataPreprocessor:
    """Data preprocessing utilities for tomato disease detection dataset."""
    
    def __init__(self, data_dir: str = "data"):
        """
        Initialize the data preprocessor.
        
        Args:
            data_dir: Directory containing the dataset
        """
        self.data_dir = data_dir
        self.class_names = [
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
        
    def organize_dataset(self, source_dir: str, target_dir: str = None) -> str:
        """
        Organize the dataset into the required structure.
        
        Args:
            source_dir: Source directory containing images
            target_dir: Target directory for organized dataset
            
        Returns:
            Path to the organized dataset
        """
        if target_dir is None:
            target_dir = self.data_dir
        
        # Create target directory structure
        for class_name in self.class_names:
            os.makedirs(os.path.join(target_dir, 'train', class_name), exist_ok=True)
            os.makedirs(os.path.join(target_dir, 'test', class_name), exist_ok=True)
        
        # Organize files by class
        for class_name in self.class_names:
            class_dir = os.path.join(source_dir, class_name)
            if os.path.exists(class_dir):
                files = [f for f in os.listdir(class_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
                
                # Split into train and test
                train_files, test_files = train_test_split(files, test_size=0.2, random_state=42)
                
                # Copy train files
                for file in train_files:
                    src = os.path.join(class_dir, file)
                    dst = os.path.join(target_dir, 'train', class_name, file)
                    shutil.copy2(src, dst)
                
                # Copy test files
                for file in test_files:
                    src = os.path.join(class_dir, file)
                    dst = os.path.join(target_dir, 'test', class_name, file)
                    shutil.copy2(src, dst)
        
        return target_dir
    
    def get_dataset_stats(self, data_dir: str = None) -> Dict:
        """
        Get statistics about the dataset.
        
        Args:
            data_dir: Directory containing the dataset
            
        Returns:
            Dictionary containing dataset statistics
        """
        if data_dir is None:
            data_dir = self.data_dir
        
        stats = {
            'train': {},
            'test': {},
            'total_images': 0,
            'class_distribution': {}
        }
        
        for split in ['train', 'test']:
            split_dir = os.path.join(data_dir, split)
            if os.path.exists(split_dir):
                for class_name in self.class_names:
                    class_dir = os.path.join(split_dir, class_name)
                    if os.path.exists(class_dir):
                        num_images = len([f for f in os.listdir(class_dir) 
                                        if f.lower().endswith(('.jpg', '.jpeg', '.png'))])
                        stats[split][class_name] = num_images
                        stats['total_images'] += num_images
                        
                        if class_name not in stats['class_distribution']:
                            stats['class_distribution'][class_name] = 0
                        stats['class_distribution'][class_name] += num_images
        
        return stats
    
    def visualize_dataset_distribution(self, data_dir: str = None, save_path: str = None):
        """
        Visualize the dataset distribution.
        
        Args:
            data_dir: Directory containing the dataset
            save_path: Path to save the visualization
        """
        if data_dir is None:
            data_dir = self.data_dir
        
        stats = self.get_dataset_stats(data_dir)
        
        # Create subplots
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 6))
        
        # Train/Test split
        train_counts = [stats['train'].get(class_name, 0) for class_name in self.class_names]
        test_counts = [stats['test'].get(class_name, 0) for class_name in self.class_names]
        
        x = np.arange(len(self.class_names))
        width = 0.35
        
        ax1.bar(x - width/2, train_counts, width, label='Train', alpha=0.8)
        ax1.bar(x + width/2, test_counts, width, label='Test', alpha=0.8)
        
        ax1.set_xlabel('Classes')
        ax1.set_ylabel('Number of Images')
        ax1.set_title('Dataset Distribution (Train vs Test)')
        ax1.set_xticks(x)
        ax1.set_xticklabels(self.class_names, rotation=45, ha='right')
        ax1.legend()
        ax1.grid(True, alpha=0.3)
        
        # Overall class distribution
        class_counts = list(stats['class_distribution'].values())
        colors = plt.cm.Set3(np.linspace(0, 1, len(self.class_names)))
        
        ax2.pie(class_counts, labels=self.class_names, autopct='%1.1f%%', 
                colors=colors, startangle=90)
        ax2.set_title('Overall Class Distribution')
        
        plt.tight_layout()
        
        if save_path:
            plt.savefig(save_path, dpi=300, bbox_inches='tight')
        
        plt.show()
    
    def augment_dataset(self, data_dir: str = None, augmentation_factor: int = 2):
        """
        Augment the dataset to balance class distribution.
        
        Args:
            data_dir: Directory containing the dataset
            augmentation_factor: Factor by which to augment the dataset
        """
        if data_dir is None:
            data_dir = self.data_dir
        
        stats = self.get_dataset_stats(data_dir)
        
        for class_name in self.class_names:
            train_dir = os.path.join(data_dir, 'train', class_name)
            if os.path.exists(train_dir):
                files = [f for f in os.listdir(train_dir) 
                        if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
                
                # Calculate how many augmented images to create
                target_count = max(stats['class_distribution'].values()) * augmentation_factor
                current_count = len(files)
                
                if current_count < target_count:
                    # Create augmented versions
                    for i in range(target_count - current_count):
                        # Randomly select a file to augment
                        original_file = random.choice(files)
                        original_path = os.path.join(train_dir, original_file)
                        
                        # Create augmented version
                        augmented_image = self._augment_single_image(original_path)
                        
                        # Save augmented image
                        base_name = os.path.splitext(original_file)[0]
                        ext = os.path.splitext(original_file)[1]
                        new_name = f"{base_name}_aug_{i}{ext}"
                        new_path = os.path.join(train_dir, new_name)
                        
                        cv2.imwrite(new_path, augmented_image)
    
    def _augment_single_image(self, image_path: str) -> np.ndarray:
        """
        Augment a single image with various transformations.
        
        Args:
            image_path: Path to the image file
            
        Returns:
            Augmented image as numpy array
        """
        # Load image
        image = cv2.imread(image_path)
        
        # Apply random transformations
        if random.random() > 0.5:
            # Random rotation
            angle = random.uniform(-30, 30)
            height, width = image.shape[:2]
            center = (width // 2, height // 2)
            rotation_matrix = cv2.getRotationMatrix2D(center, angle, 1.0)
            image = cv2.warpAffine(image, rotation_matrix, (width, height))
        
        if random.random() > 0.5:
            # Random brightness adjustment
            brightness = random.uniform(0.7, 1.3)
            image = cv2.convertScaleAbs(image, alpha=brightness, beta=0)
        
        if random.random() > 0.5:
            # Random contrast adjustment
            contrast = random.uniform(0.8, 1.2)
            image = cv2.convertScaleAbs(image, alpha=contrast, beta=0)
        
        if random.random() > 0.5:
            # Random horizontal flip
            image = cv2.flip(image, 1)
        
        if random.random() > 0.5:
            # Random crop and resize
            height, width = image.shape[:2]
            crop_size = min(height, width) // 2
            x = random.randint(0, width - crop_size)
            y = random.randint(0, height - crop_size)
            image = image[y:y+crop_size, x:x+crop_size]
            image = cv2.resize(image, (width, height))
        
        return image
    
    def validate_dataset(self, data_dir: str = None) -> Dict:
        """
        Validate the dataset for common issues.
        
        Args:
            data_dir: Directory containing the dataset
            
        Returns:
            Dictionary containing validation results
        """
        if data_dir is None:
            data_dir = self.data_dir
        
        validation_results = {
            'valid': True,
            'issues': [],
            'class_counts': {},
            'corrupted_files': []
        }
        
        for split in ['train', 'test']:
            split_dir = os.path.join(data_dir, split)
            if not os.path.exists(split_dir):
                validation_results['issues'].append(f"Missing {split} directory")
                validation_results['valid'] = False
                continue
            
            for class_name in self.class_names:
                class_dir = os.path.join(split_dir, class_name)
                if not os.path.exists(class_dir):
                    validation_results['issues'].append(f"Missing {class_name} directory in {split}")
                    validation_results['valid'] = False
                    continue
                
                files = [f for f in os.listdir(class_dir) 
                        if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
                
                if len(files) == 0:
                    validation_results['issues'].append(f"No images found in {class_name}/{split}")
                    validation_results['valid'] = False
                
                validation_results['class_counts'][f"{class_name}_{split}"] = len(files)
                
                # Check for corrupted files
                for file in files:
                    file_path = os.path.join(class_dir, file)
                    try:
                        img = cv2.imread(file_path)
                        if img is None:
                            validation_results['corrupted_files'].append(file_path)
                    except Exception as e:
                        validation_results['corrupted_files'].append(file_path)
        
        return validation_results
    
    def create_sample_dataset(self, output_dir: str = "sample_data"):
        """
        Create a small sample dataset for testing purposes.
        
        Args:
            output_dir: Directory to save the sample dataset
        """
        # Create directory structure
        for split in ['train', 'test']:
            for class_name in self.class_names:
                os.makedirs(os.path.join(output_dir, split, class_name), exist_ok=True)
        
        # Create sample images (this is just for demonstration)
        # In a real scenario, you would copy actual images from your dataset
        print(f"Sample dataset structure created at: {output_dir}")
        print("Please add your actual tomato disease images to the appropriate directories.") 