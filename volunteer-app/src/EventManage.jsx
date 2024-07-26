import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
  const [events, setEvents] = useState([]);

  const skillsOptions = [
    'Communication', 'Teamwork', 'Problem Solving', 'Leadership', 'Time Management'
  ];

  const urgencyOptions = [
    'Low', 'Medium', 'High'
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/events/create', formData);
      alert('Event created successfully');
      setEvents([...events, response.data]);
      setFormData({
        eventName: '',
        eventDescription: '',
        location: '',
        requiredSkills: [],
        urgency: '',
        eventDate: '',
      });
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/events/${id}`);
      setEvents(events.filter(event => event._id !== id));  // Assuming `_id` is used as ID
    } catch (error) {
      console.error('Error deleting event:', error);
    }
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
      <h2 className="form-title">Existing Events</h2>
      <ul className="event-list">
        {events.map((event) => (
          <li key={event._id} className="event-item">  {/* Use `_id` if that's what the backend provides */}
            <h3>{event.eventName}</h3>
            <p>{event.eventDescription}</p>
            <p>{event.location}</p>
            <p>{event.requiredSkills.join(', ')}</p>
            <p>{event.urgency}</p>
            <p>{event.eventDate}</p>
            <button onClick={() => handleDelete(event._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventManage;

