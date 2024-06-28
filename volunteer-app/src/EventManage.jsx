// src/EventManage.jsx
import React, { useState } from 'react';
import './index.css';

const EventManage = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    eventDescription: '',
    location: '',
    requiredSkills: [],
    urgency: '',
    eventDate: '',
  });

  const skillsOptions = [
    'Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5'
  ];

  const urgencyOptions = [
    'Low', 'Medium', 'High'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMultiSelectChange = (e) => {
    const options = e.target.options;
    const selectedOptions = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedOptions.push(options[i].value);
      }
    }
    setFormData({
      ...formData,
      requiredSkills: selectedOptions,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send the data to the server or update the state
    console.log(formData);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create Event</h2>
      <form className="event-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="eventName" className="form-label">Event Name (required):</label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            className="form-input"
            maxLength="100"
            value={formData.eventName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventDescription" className="form-label">Event Description (required):</label>
          <textarea
            id="eventDescription"
            name="eventDescription"
            className="form-input"
            value={formData.eventDescription}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location" className="form-label">Location (required):</label>
          <textarea
            id="location"
            name="location"
            className="form-input"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="requiredSkills" className="form-label">Required Skills (required):</label>
          <select
            id="requiredSkills"
            name="requiredSkills"
            className="form-input"
            multiple
            value={formData.requiredSkills}
            onChange={handleMultiSelectChange}
            required
          >
            {skillsOptions.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="urgency" className="form-label">Urgency (required):</label>
          <select
            id="urgency"
            name="urgency"
            className="form-input"
            value={formData.urgency}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>Select urgency</option>
            {urgencyOptions.map((urgency) => (
              <option key={urgency} value={urgency}>
                {urgency}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="eventDate" className="form-label">Event Date (required):</label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            className="form-input"
            value={formData.eventDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="form-button">Create Event</button>
      </form>
    </div>
  );
};

export default EventManage;
