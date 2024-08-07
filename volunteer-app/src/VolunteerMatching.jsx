// src/components/VolunteerMatching.jsx
import React, { useState, useEffect } from 'react';
import './index.css';

const VolunteerMatching = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState('');
  const [matchedEvent, setMatchedEvent] = useState('');

  // Fetch volunteers from the database
  useEffect(() => {
    fetch('/api/volunteers')
      .then(response => response.json())
      .then(data => setVolunteers(data))
      .catch(error => console.error('Error fetching volunteers:', error));
  }, []);

  // Fetch events from the database based on selected volunteer's profile
  useEffect(() => {
    if (selectedVolunteer) {
      // Replace with actual API call
      fetch(`/api/match-event?volunteerId=${selectedVolunteer}`)
        .then(response => response.json())
        .then(data => setMatchedEvent(data.eventName))
        .catch(error => console.error('Error fetching matched event:', error));
    }
  }, [selectedVolunteer]);

  return (
    <div className="volunteer-matching-container">
      <h2 className="form-title">Volunteer Matching Form</h2>
      <form className="volunteer-matching-form">
        <div className="form-group">
          <label htmlFor="volunteerName" className="form-label">Volunteer Name:</label>
          <select
            id="volunteerName"
            name="volunteerName"
            className="form-input"
            value={selectedVolunteer}
            onChange={(e) => setSelectedVolunteer(e.target.value)}
          >
            <option value="">Select a volunteer</option>
            {volunteers.map(volunteer => (
              <option key={volunteer.id} value={volunteer.id}>
                {volunteer.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="matchedEvent" className="form-label">Matched Event:</label>
          <input
            type="text"
            id="matchedEvent"
            name="matchedEvent"
            className="form-input"
            value={matchedEvent}
            readOnly
          />
        </div>
      </form>
    </div>
  );
};

export default VolunteerMatching;
