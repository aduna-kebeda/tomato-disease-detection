import os
import sys
import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt
import seaborn as sns
import json
from sklearn.metrics import classification_report, confusion_matrix, precision_recall_fscore_support
import pandas as pd

# Add parent directory to path to import utilities
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils.model_utils import ModelManager
from utils.image_processing import ImageProcessor

class ModelEvaluator:
    """Comprehensive model evaluation for tomato disease detection."""
    
    def __init__(self, model_dir: str = "model/saved_models"):
        """
        Initialize the model evaluator.
        
        Args:
            model_dir: Directory containing trained models
        """
        self.model_dir = model_dir
        self.model_manager = ModelManager(model_dir)
        self.image_processor = ImageProcessor()
        
    def load_model_and_data(self, model_name: str = "tomato_disease_model", data_dir: str = "data"):
        """
        Load the trained model and test data.
        
        Args:
            model_name: Name of the model to evaluate
            data_dir: Directory containing the dataset
            
        Returns:
            Tuple of (model, test_generator, metadata)
        """
        # Load the model
        model, metadata = self.model_manager.load_model(model_name)
        
        # Create test data generator
        test_datagen = tf.keras.preprocessing.image.ImageDataGenerator(rescale=1./255)
        test_generator = test_datagen.flow_from_directory(
            os.path.join(data_dir, 'test'),
            target_size=(224, 224),
            batch_size=32,
            class_mode='categorical',
            shuffle=False
        )
        
        return model, test_generator, metadata
    
    def evaluate_model_performance(self, model_name: str = "tomato_disease_model", data_dir: str = "data"):
        """
        Evaluate the model performance comprehensively.
        
        Args:
            model_name: Name of the model to evaluate
            data_dir: Directory containing the dataset
            
        Returns:
            Dictionary containing evaluation results
        """
        print(f"Evaluating model: {model_name}")
        
        # Load model and data
        model, test_generator, metadata = self.load_model_and_data(model_name, data_dir)
        
        # Get predictions
        print("Generating predictions...")
        predictions = model.predict(test_generator, verbose=1)
        y_pred = np.argmax(predictions, axis=1)
        y_true = test_generator.classes
        
        # Calculate metrics
        print("Calculating metrics...")
        accuracy = np.mean(y_pred == y_true)
        
        # Calculate precision, recall, and F1-score for each class
        precision, recall, f1_score, support = precision_recall_fscore_support(
            y_true, y_pred, average=None
        )
        
        # Calculate macro and weighted averages
        macro_precision = np.mean(precision)
        macro_recall = np.mean(recall)
        macro_f1 = np.mean(f1_score)
        
        weighted_precision, weighted_recall, weighted_f1, _ = precision_recall_fscore_support(
            y_true, y_pred, average='weighted'
        )
        
        # Create confusion matrix
        cm = confusion_matrix(y_true, y_pred)
        
        # Create detailed classification report
        class_names = self.model_manager.class_names
        report = classification_report(y_true, y_pred, target_names=class_names, output_dict=True)
        
        # Compile results
        results = {
            'model_name': model_name,
            'accuracy': float(accuracy),
            'precision': {
                'per_class': precision.tolist(),
                'macro': float(macro_precision),
                'weighted': float(weighted_precision)
            },
            'recall': {
                'per_class': recall.tolist(),
                'macro': float(macro_recall),
                'weighted': float(weighted_recall)
            },
            'f1_score': {
                'per_class': f1_score.tolist(),
                'macro': float(macro_f1),
                'weighted': float(weighted_f1)
            },
            'support': support.tolist(),
            'confusion_matrix': cm.tolist(),
            'classification_report': report,
            'class_names': class_names,
            'predictions': predictions.tolist(),
            'true_labels': y_true.tolist(),
            'predicted_labels': y_pred.tolist()
        }
        
        return results
    
    def plot_confusion_matrix(self, results: dict, save_path: str = None):
        """
        Plot and save confusion matrix.
        
        Args:
            results: Evaluation results dictionary
            save_path: Path to save the plot
        """
        cm = np.array(results['confusion_matrix'])
        class_names = results['class_names']
        
        plt.figure(figsize=(12, 10))
        sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
                   xticklabels=class_names, yticklabels=class_names)
        plt.title('Confusion Matrix')
        plt.xlabel('Predicted')
        plt.ylabel('Actual')
        plt.xticks(rotation=45, ha='right')
        plt.yticks(rotation=0)
        plt.tight_layout()
        
        if save_path:
            plt.savefig(save_path, dpi=300, bbox_inches='tight')
        
        plt.show()
    
    def plot_metrics_by_class(self, results: dict, save_path: str = None):
        """
        Plot precision, recall, and F1-score by class.
        
        Args:
            results: Evaluation results dictionary
            save_path: Path to save the plot
        """
        class_names = results['class_names']
        precision = results['precision']['per_class']
        recall = results['recall']['per_class']
        f1_score = results['f1_score']['per_class']
        
        x = np.arange(len(class_names))
        width = 0.25
        
        fig, ax = plt.subplots(figsize=(15, 8))
        ax.bar(x - width, precision, width, label='Precision', alpha=0.8)
        ax.bar(x, recall, width, label='Recall', alpha=0.8)
        ax.bar(x + width, f1_score, width, label='F1-Score', alpha=0.8)
        
        ax.set_xlabel('Classes')
        ax.set_ylabel('Score')
        ax.set_title('Model Performance by Class')
        ax.set_xticks(x)
        ax.set_xticklabels(class_names, rotation=45, ha='right')
        ax.legend()
        ax.grid(True, alpha=0.3)
        
        # Add value labels on bars
        for i, (p, r, f) in enumerate(zip(precision, recall, f1_score)):
            ax.text(i - width, p + 0.01, f'{p:.3f}', ha='center', va='bottom')
            ax.text(i, r + 0.01, f'{r:.3f}', ha='center', va='bottom')
            ax.text(i + width, f + 0.01, f'{f:.3f}', ha='center', va='bottom')
        
        plt.tight_layout()
        
        if save_path:
            plt.savefig(save_path, dpi=300, bbox_inches='tight')
        
        plt.show()
    
    def create_evaluation_report(self, results: dict, save_path: str = None):
        """
        Create a comprehensive evaluation report.
        
        Args:
            results: Evaluation results dictionary
            save_path: Path to save the report
        """
        report_lines = []
        report_lines.append("=" * 60)
        report_lines.append("TOMATO DISEASE DETECTION MODEL EVALUATION REPORT")
        report_lines.append("=" * 60)
        report_lines.append(f"Model: {results['model_name']}")
        report_lines.append(f"Overall Accuracy: {results['accuracy']:.4f}")
        report_lines.append("")
        
        # Overall metrics
        report_lines.append("OVERALL METRICS:")
        report_lines.append("-" * 20)
        report_lines.append(f"Macro Precision: {results['precision']['macro']:.4f}")
        report_lines.append(f"Macro Recall: {results['recall']['macro']:.4f}")
        report_lines.append(f"Macro F1-Score: {results['f1_score']['macro']:.4f}")
        report_lines.append(f"Weighted Precision: {results['precision']['weighted']:.4f}")
        report_lines.append(f"Weighted Recall: {results['recall']['weighted']:.4f}")
        report_lines.append(f"Weighted F1-Score: {results['f1_score']['weighted']:.4f}")
        report_lines.append("")
        
        # Per-class metrics
        report_lines.append("PER-CLASS METRICS:")
        report_lines.append("-" * 20)
        report_lines.append(f"{'Class':<25} {'Precision':<10} {'Recall':<10} {'F1-Score':<10} {'Support':<10}")
        report_lines.append("-" * 70)
        
        for i, class_name in enumerate(results['class_names']):
            precision = results['precision']['per_class'][i]
            recall = results['recall']['per_class'][i]
            f1 = results['f1_score']['per_class'][i]
            support = results['support'][i]
            report_lines.append(f"{class_name:<25} {precision:<10.4f} {recall:<10.4f} {f1:<10.4f} {support:<10}")
        
        report_lines.append("")
        
        # Detailed classification report
        report_lines.append("DETAILED CLASSIFICATION REPORT:")
        report_lines.append("-" * 30)
        
        # Convert sklearn report to string
        from sklearn.metrics import classification_report
        detailed_report = classification_report(
            results['true_labels'], 
            results['predicted_labels'], 
            target_names=results['class_names']
        )
        report_lines.append(detailed_report)
        
        report = "\n".join(report_lines)
        
        if save_path:
            with open(save_path, 'w') as f:
                f.write(report)
        
        print(report)
        return report
    
    def compare_models(self, model_names: list, data_dir: str = "data"):
        """
        Compare multiple models.
        
        Args:
            model_names: List of model names to compare
            data_dir: Directory containing the dataset
        """
        comparison_results = {}
        
        for model_name in model_names:
            try:
                results = self.evaluate_model_performance(model_name, data_dir)
                comparison_results[model_name] = {
                    'accuracy': results['accuracy'],
                    'macro_precision': results['precision']['macro'],
                    'macro_recall': results['recall']['macro'],
                    'macro_f1': results['f1_score']['macro'],
                    'weighted_f1': results['f1_score']['weighted']
                }
            except Exception as e:
                print(f"Error evaluating model {model_name}: {str(e)}")
        
        # Create comparison plot
        if comparison_results:
            self.plot_model_comparison(comparison_results)
        
        return comparison_results
    
    def plot_model_comparison(self, comparison_results: dict, save_path: str = None):
        """
        Plot comparison of multiple models.
        
        Args:
            comparison_results: Dictionary of model comparison results
            save_path: Path to save the plot
        """
        models = list(comparison_results.keys())
        metrics = ['accuracy', 'macro_precision', 'macro_recall', 'macro_f1', 'weighted_f1']
        
        fig, axes = plt.subplots(2, 3, figsize=(18, 12))
        axes = axes.flatten()
        
        for i, metric in enumerate(metrics):
            values = [comparison_results[model][metric] for model in models]
            
            axes[i].bar(models, values, alpha=0.8)
            axes[i].set_title(f'{metric.replace("_", " ").title()}')
            axes[i].set_ylabel('Score')
            axes[i].tick_params(axis='x', rotation=45)
            
            # Add value labels
            for j, v in enumerate(values):
                axes[i].text(j, v + 0.01, f'{v:.3f}', ha='center', va='bottom')
        
        # Remove the last subplot if not needed
        if len(metrics) < len(axes):
            fig.delaxes(axes[-1])
        
        plt.tight_layout()
        
        if save_path:
            plt.savefig(save_path, dpi=300, bbox_inches='tight')
        
        plt.show()

def main():
    """Main function to run the evaluation."""
    # Check if data directory exists
    data_dir = "data"
    if not os.path.exists(data_dir):
        print(f"Data directory '{data_dir}' not found!")
        return
    
    # Initialize evaluator
    evaluator = ModelEvaluator()
    
    # Evaluate the model
    try:
        results = evaluator.evaluate_model_performance(data_dir=data_dir)
        
        # Create plots
        evaluator.plot_confusion_matrix(results, "model/saved_models/confusion_matrix.png")
        evaluator.plot_metrics_by_class(results, "model/saved_models/metrics_by_class.png")
        
        # Create report
        evaluator.create_evaluation_report(results, "model/saved_models/evaluation_report.txt")
        
        # Save results as JSON
        with open("model/saved_models/evaluation_results.json", 'w') as f:
            json.dump(results, f, indent=2)
        
        print("\nEvaluation completed successfully!")
        print(f"Overall Accuracy: {results['accuracy']:.4f}")
        print(f"Macro F1-Score: {results['f1_score']['macro']:.4f}")
        
    except Exception as e:
        print(f"Evaluation failed with error: {str(e)}")
        raise

if __name__ == "__main__":
    main() 