import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import StudentForm from './components/StudentForm';
import PredictionResult from './components/PredictionResult';

function App() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:5000/api/predict', formData);
      setPrediction(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error making prediction. Is the backend running?');
      setPrediction(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🎓 AI Productivity Maximizer for Students</h1>
        <p>Predict your exam score and get personalized recommendations</p>
      </header>

      <div className="container">
        <div className="form-section">
          <StudentForm onSubmit={handleSubmit} loading={loading} />
        </div>

        <div className="result-section">
          {loading && <div className="loader">Processing...</div>}
          {error && <div className="error-message">❌ {error}</div>}
          {prediction && <PredictionResult data={prediction} />}
        </div>
      </div>
    </div>
  );
}

export default App;
