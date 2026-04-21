import React from 'react';
import './PredictionResult.css';

const PredictionResult = ({ data }) => {
  if (!data.success) {
    return <div className="error">Error: {data.error}</div>;
  }

  const isPass = data.pass_fail === 'PASS';
  const isHighPerformance = data.performance_prediction === 'High Performance';

  return (
    <div className="prediction-result">
      <h2>📊 Your Prediction Results</h2>

      <div className="results-grid">
        {/* Exam Score Prediction */}
        <div className="result-card score-card">
          <div className="result-label">Predicted Exam Score</div>
          <div className={`result-value ${isPass ? 'pass' : 'fail'}`}>
            {data.exam_score_prediction}
            <span className="result-unit">/100</span>
          </div>
          <div className={`result-status ${isPass ? 'pass' : 'fail'}`}>
            {data.pass_fail}
          </div>
        </div>

        {/* Performance Classification */}
        <div className="result-card performance-card">
          <div className="result-label">Performance Classification</div>
          <div className={`result-value ${isHighPerformance ? 'high' : 'low'}`}>
            {data.performance_prediction}
          </div>
          <div className="confidence">
            Confidence: {(data.performance_confidence * 100).toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="recommendations-section">
        <h3>💡 Way Forward - Personalized Recommendations</h3>
        <div className="recommendations-list">
          {data.recommendations.map((rec, idx) => (
            <div key={idx} className="recommendation-item">
              <span className="recommendation-icon">✓</span>
              <span className="recommendation-text">{rec}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PredictionResult;
