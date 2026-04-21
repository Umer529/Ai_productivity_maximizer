from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder
import warnings
import os
warnings.filterwarnings('ignore')

app = Flask(__name__)
CORS(app)

# Correct path to artifacts folder
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ARTIFACTS_DIR = os.path.join(BASE_DIR, '../../artifacts')

print(f"Looking for models in: {ARTIFACTS_DIR}")
print(f"Artifacts directory exists: {os.path.exists(ARTIFACTS_DIR)}")

# Load trained models
lr_model = None
clf_model = None

try:
    lr_model_path = os.path.join(ARTIFACTS_DIR, 'regression_model.pkl')
    clf_model_path = os.path.join(ARTIFACTS_DIR, 'performance_model.pkl')
    
    if os.path.exists(lr_model_path):
        lr_model = joblib.load(lr_model_path)
        print(f"✓ Regression model loaded from {lr_model_path}")
    else:
        print(f"✗ Regression model not found at {lr_model_path}")
        
    if os.path.exists(clf_model_path):
        clf_model = joblib.load(clf_model_path)
        print(f"✓ Classification model loaded from {clf_model_path}")
    else:
        print(f"✗ Classification model not found at {clf_model_path}")
        
except Exception as e:
    print(f"Error loading models: {e}")

# Feature columns (from the CSV after preprocessing)
FEATURE_COLUMNS = [
    'age', 'gender', 'study_hours_per_day', 'social_media_hours', 
    'netflix_hours', 'part_time_job', 'attendance_percentage', 
    'sleep_hours', 'diet_quality', 'exercise_frequency', 
    'parental_education_level', 'internet_quality', 'mental_health_rating', 
    'extracurricular_participation'
]

# Categorical columns that need encoding
CATEGORICAL_COLS = ['gender', 'part_time_job', 'diet_quality', 'parental_education_level', 'internet_quality', 'extracurricular_participation']

# Mock label encoders (same as training)
label_encoders = {
    'gender': {'Male': 0, 'Female': 1},
    'part_time_job': {'No': 0, 'Yes': 1},
    'diet_quality': {'Poor': 0, 'Fair': 1, 'Good': 2},
    'parental_education_level': {'High School': 0, 'Bachelor': 1, 'Master': 2},
    'internet_quality': {'Poor': 0, 'Average': 1, 'Good': 2},
    'extracurricular_participation': {'No': 0, 'Yes': 1}
}

def get_way_forward(student_data, predicted_score):
    """Generate personalized recommendations based on student data and predicted score"""
    recommendations = []
    
    if student_data.get('study_hours_per_day', 0) < 4:
        recommendations.append('Increase study hours to at least 4-5 hours per day.')
    if student_data.get('attendance_percentage', 0) < 85:
        recommendations.append('Raise attendance to 85% or higher.')
    if student_data.get('sleep_hours', 0) < 7:
        recommendations.append('Target 7-8 hours of sleep for better concentration.')
    if student_data.get('social_media_hours', 0) > 2:
        recommendations.append('Reduce social media time by 1-2 hours.')
    if student_data.get('netflix_hours', 0) > 2:
        recommendations.append('Cut down entertainment hours and use that time for revision.')
    if student_data.get('exercise_frequency', 0) < 3:
        recommendations.append('Exercise at least 3 times a week to improve focus and energy.')
    if student_data.get('mental_health_rating', 0) < 6:
        recommendations.append('Add stress management breaks, sleep discipline, and lighter study blocks.')
    
    # Score-based priority
    if predicted_score < 50:
        recommendations.append('Priority: Revise fundamentals first and build a daily study routine.')
    elif predicted_score < 70:
        recommendations.append('Priority: Keep consistent revision and remove distractions.')
    else:
        recommendations.append('Priority: Maintain your routine and focus on practice tests.')
    
    return recommendations

def preprocess_input(data):
    """Convert input data to the format expected by the model"""
    processed = {}
    
    for col in FEATURE_COLUMNS:
        if col in CATEGORICAL_COLS:
            # Encode categorical values
            value = data.get(col)
            if col in label_encoders and value in label_encoders[col]:
                processed[col] = label_encoders[col][value]
            else:
                processed[col] = 0  # Default fallback
        else:
            # Numeric values
            processed[col] = float(data.get(col, 0))
    
    return processed

@app.route('/api/predict', methods=['POST'])
def predict():
    """Endpoint to predict student performance and score"""
    
    # Check if models are loaded
    if lr_model is None or clf_model is None:
        return jsonify({
            'error': 'Models not loaded. Please ensure artifacts/regression_model.pkl and artifacts/performance_model.pkl exist.',
            'success': False
        }), 500
    
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Preprocess input
        processed_data = preprocess_input(data)
        
        # Create feature vector in correct order
        feature_vector = np.array([processed_data[col] for col in FEATURE_COLUMNS]).reshape(1, -1)
        
        # Get predictions
        regression_prediction = lr_model.predict(feature_vector)[0]
        # Clamp exam score to valid range [0, 100]
        regression_prediction = max(0, min(100, regression_prediction))
        classification_prediction = clf_model.predict(feature_vector)[0]
        classification_probability = clf_model.predict_proba(feature_vector)[0]
        
        # Generate recommendations
        recommendations = get_way_forward(data, regression_prediction)
        
        # Prepare response
        response = {
            'success': True,
            'exam_score_prediction': round(float(regression_prediction), 2),
            'performance_prediction': 'High Performance' if classification_prediction == 1 else 'Low Performance',
            'performance_confidence': round(float(max(classification_probability)), 4),
            'pass_fail': 'PASS' if regression_prediction >= 70 else 'FAIL',
            'recommendations': recommendations
        }
        
        return jsonify(response), 200
    
    except Exception as e:
        return jsonify({'error': str(e), 'success': False}), 500

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'Backend is running', 'models_loaded': lr_model is not None and clf_model is not None}), 200

@app.route('/api/features', methods=['GET'])
def features():
    """Get feature columns for frontend validation"""
    return jsonify({
        'features': FEATURE_COLUMNS,
        'categorical_mappings': label_encoders
    }), 200

if __name__ == '__main__':
    app.run(debug=False, port=5000, threaded=True)
