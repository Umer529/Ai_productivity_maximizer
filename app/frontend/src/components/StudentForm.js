import React, { useState } from 'react';
import './StudentForm.css';

const StudentForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    age: 20,
    gender: 'Male',
    study_hours_per_day: 3,
    social_media_hours: 2,
    netflix_hours: 1,
    part_time_job: 'No',
    attendance_percentage: 85,
    sleep_hours: 7,
    diet_quality: 'Good',
    exercise_frequency: 3,
    parental_education_level: 'Bachelor',
    internet_quality: 'Good',
    mental_health_rating: 7,
    extracurricular_participation: 'Yes'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: isNaN(value) ? value : parseFloat(value)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h2>Student Information</h2>

      <div className="form-group">
        <label>Age</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} min="16" max="50" />
      </div>

      <div className="form-group">
        <label>Gender</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>

      <div className="form-group">
        <label>Study Hours Per Day</label>
        <input type="number" name="study_hours_per_day" value={formData.study_hours_per_day} onChange={handleChange} min="0" max="12" step="0.5" />
      </div>

      <div className="form-group">
        <label>Social Media Hours</label>
        <input type="number" name="social_media_hours" value={formData.social_media_hours} onChange={handleChange} min="0" max="8" step="0.5" />
      </div>

      <div className="form-group">
        <label>Netflix/Entertainment Hours</label>
        <input type="number" name="netflix_hours" value={formData.netflix_hours} onChange={handleChange} min="0" max="8" step="0.5" />
      </div>

      <div className="form-group">
        <label>Part-Time Job</label>
        <select name="part_time_job" value={formData.part_time_job} onChange={handleChange}>
          <option>No</option>
          <option>Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label>Attendance Percentage</label>
        <input type="number" name="attendance_percentage" value={formData.attendance_percentage} onChange={handleChange} min="0" max="100" step="1" />
      </div>

      <div className="form-group">
        <label>Sleep Hours Per Day</label>
        <input type="number" name="sleep_hours" value={formData.sleep_hours} onChange={handleChange} min="0" max="12" step="0.5" />
      </div>

      <div className="form-group">
        <label>Diet Quality</label>
        <select name="diet_quality" value={formData.diet_quality} onChange={handleChange}>
          <option>Poor</option>
          <option>Fair</option>
          <option>Good</option>
        </select>
      </div>

      <div className="form-group">
        <label>Exercise Frequency (Times Per Week)</label>
        <input type="number" name="exercise_frequency" value={formData.exercise_frequency} onChange={handleChange} min="0" max="7" />
      </div>

      <div className="form-group">
        <label>Parental Education Level</label>
        <select name="parental_education_level" value={formData.parental_education_level} onChange={handleChange}>
          <option>High School</option>
          <option>Bachelor</option>
          <option>Master</option>
        </select>
      </div>

      <div className="form-group">
        <label>Internet Quality</label>
        <select name="internet_quality" value={formData.internet_quality} onChange={handleChange}>
          <option>Poor</option>
          <option>Average</option>
          <option>Good</option>
        </select>
      </div>

      <div className="form-group">
        <label>Mental Health Rating (1-10)</label>
        <input type="number" name="mental_health_rating" value={formData.mental_health_rating} onChange={handleChange} min="1" max="10" />
      </div>

      <div className="form-group">
        <label>Extracurricular Participation</label>
        <select name="extracurricular_participation" value={formData.extracurricular_participation} onChange={handleChange}>
          <option>No</option>
          <option>Yes</option>
        </select>
      </div>

      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? 'Predicting...' : 'Get Prediction'}
      </button>
    </form>
  );
};

export default StudentForm;
