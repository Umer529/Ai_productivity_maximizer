# AI Productivity Maximizer - Full Stack Application

A complete web application for predicting student exam scores and providing personalized recommendations using machine learning models.

## 📁 Project Structure

```
app/
├── backend/          # Flask API server
│   ├── app.py        # Main Flask application
│   └── requirements.txt
└── frontend/         # React.js application
    ├── src/
    │   ├── components/
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    ├── public/
    ├── package.json
    └── README.md
```

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd app/backend
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the Flask server:
```bash
python app.py
```

The backend will start on `http://localhost:5000`

**Health Check:** Visit `http://localhost:5000/api/health` to verify the backend is running.

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd app/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

## 🎯 How It Works

### 1. **Student Input Form**
   - User enters 14 different student metrics
   - Includes study habits, health factors, and demographic info

### 2. **Backend Processing**
   - Receives form data via POST request
   - Preprocesses and encodes categorical variables
   - Loads trained models (Linear Regression & Logistic Regression)
   - Generates predictions

### 3. **Prediction Models**

   **Logistic Regression (Classification)**
   - Predicts: High Performance or Low Performance
   - Binary classification (0 or 1)
   - Provides confidence score
   
   **Linear Regression (Regression)**
   - Predicts: Continuous exam score (0-100)
   - Also used for generating recommendations
   - Analyzes which factors boost/harm performance

### 4. **Results Display**
   - **Exam Score:** Predicted continuous score
   - **Pass/Fail:** Based on score >= 70
   - **Performance Label:** High or Low (from classifier)
   - **Confidence:** How confident the classifier is
   - **Way Forward:** 7-8 personalized recommendations

## 📊 Input Features (14 Parameters)

| Feature | Type | Range |
|---------|------|-------|
| Age | Numeric | 16-50 |
| Gender | Categorical | Male/Female |
| Study Hours/Day | Numeric | 0-12 |
| Social Media Hours | Numeric | 0-8 |
| Netflix Hours | Numeric | 0-8 |
| Part-Time Job | Categorical | Yes/No |
| Attendance % | Numeric | 0-100 |
| Sleep Hours | Numeric | 0-12 |
| Diet Quality | Categorical | Poor/Fair/Good |
| Exercise Frequency | Numeric | 0-7 |
| Parental Education | Categorical | High School/Bachelor/Master |
| Internet Quality | Categorical | Poor/Average/Good |
| Mental Health Rating | Numeric | 1-10 |
| Extracurricular | Categorical | Yes/No |

## 🔌 API Endpoints

### POST `/api/predict`
**Request:**
```json
{
  "age": 20,
  "gender": "Male",
  "study_hours_per_day": 4,
  ...
}
```

**Response:**
```json
{
  "success": true,
  "exam_score_prediction": 75.42,
  "performance_prediction": "High Performance",
  "performance_confidence": 0.92,
  "pass_fail": "PASS",
  "recommendations": [
    "Increase study hours to at least 4-5 hours per day.",
    "Raise attendance to 85% or higher.",
    ...
  ]
}
```

### GET `/api/health`
Health check endpoint to verify backend is running.

### GET `/api/features`
Returns available features and categorical mappings for validation.

## 🎨 UI Features

- **Responsive Design:** Works on desktop and mobile
- **Modern Styling:** Gradient backgrounds, smooth animations
- **Real-time Feedback:** Loading states and error handling
- **Clear Results:** Easy-to-read prediction cards and recommendations

## 🛠️ Technologies Used

**Backend:**
- Flask
- scikit-learn
- joblib (model loading)
- pandas, numpy

**Frontend:**
- React.js
- Axios (API calls)
- CSS3 (styling)

## 📝 Models Used

1. **Logistic Regression** - Best performer for binary classification (F1 score: 0.9)
2. **Linear Regression** - For continuous exam score prediction
3. Trained on 1000+ student records from `student_habits_performance.csv`

## ⚠️ Important Notes

- Ensure both backend and frontend servers are running simultaneously
- The backend looks for trained model files in `../artifacts/`
- Default values in the form represent a typical student
- Modify values and click "Get Prediction" to see how changes affect predictions

## 🚀 Deployment

### Backend (Flask)
```bash
# Use a production WSGI server like Gunicorn
pip install gunicorn
gunicorn app:app
```

### Frontend (React)
```bash
# Build for production
npm run build

# Deploy the 'build' folder to any static hosting (Vercel, Netlify, etc.)
```

## 📧 Support & Customization

- Modify input fields in `StudentForm.js` to add/remove metrics
- Adjust recommendation logic in `app.py` (get_way_forward function)
- Update styling in CSS files to match your branding
- Add more models by loading them in Flask and exposing new endpoints

---

**Created:** April 22, 2026 | **Version:** 1.0.0
