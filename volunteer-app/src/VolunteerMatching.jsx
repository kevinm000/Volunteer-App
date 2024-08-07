import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const VolunteerMatching = () => {
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState({
    eventName: '',
    eventDescription: '',
    location: '',
    requiredSkills: [],
    urgency: '',
    eventDate: '',
  });
  const [editingEventId, setEditingEventId] = useState(null);

  // Fetch all events
  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/volunteer-match');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  // Handle form submit for creating/updating events
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEventId) {
        await axios.put(`http://localhost:3000/api/volunteer-match/${editingEventId}`, event);
      } else {
        await axios.post('http://localhost:3000/api/volunteer-match', event);
      }
      setEvent({
        eventName: '',
        eventDescription: '',
        location: '',
        requiredSkills: [],
        urgency: '',
        eventDate: '',
      });
      setEditingEventId(null);
      fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  // Handle edit event
  const handleEdit = (eventToEdit) => {
    setEvent(eventToEdit);
    setEditingEventId(eventToEdit._id);
  };

  // Handle delete event
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/volunteer-match/${id}`);
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="volunteer-matching-container">
      <h2>Volunteer Matching</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="eventName">Event Name</label>
          <input
            id="eventName"
            name="eventName"
            type="text"
            value={event.eventName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="eventDescription">Event Description</label>
          <input
            id="eventDescription"
            name="eventDescription"
            type="text"
            value={event.eventDescription}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input
            id="location"
            name="location"
            type="text"
            value={event.location}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="requiredSkills">Required Skills (comma-separated)</label>
          <input
            id="requiredSkills"
            name="requiredSkills"
            type="text"
            value={event.requiredSkills.join(', ')}
            onChange={(e) =>
              setEvent((prevEvent) => ({
                ...prevEvent,
                requiredSkills: e.target.value.split(',').map(skill => skill.trim())
              }))
            }
            required
          />
        </div>
        <div>
          <label htmlFor="urgency">Urgency</label>
          <input
            id="urgency"
            name="urgency"
            type="text"
            value={event.urgency}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="eventDate">Event Date</label>
          <input
            id="eventDate"
            name="eventDate"
            type="date"
            value={event.eventDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">{editingEventId ? 'Update Event' : 'Create Event'}</button>
      </form>
      <div className="events-list">
        <h3>All Events</h3>
        <ul>
          {events.map((event) => (
            <li key={event._id}>
              <h4>{event.eventName}</h4>
              <p>{event.eventDescription}</p>
              <p>Location: {event.location}</p>
              <p>Required Skills: {event.requiredSkills.join(', ')}</p>
              <p>Urgency: {event.urgency}</p>
              <p>Date: {new Date(event.eventDate).toLocaleDateString()}</p>
              <button onClick={() => handleEdit(event)}>Edit</button>
              <button onClick={() => handleDelete(event._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VolunteerMatching;
