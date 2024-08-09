import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Ensure this path is correct
import './index.css';

const VolunteerMatching = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [matchedVolunteers, setMatchedVolunteers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    

    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/events', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setEvents(response.data);
      } catch (error) {
        setError('Failed to fetch events');
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents().finally(() => setLoading(false));
  }, [user]);

  const handleMatchVolunteers = async (eventId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/volunteer-matching/matched-profiles/${eventId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setMatchedVolunteers(prev => ({ ...prev, [eventId]: response.data }));
    } catch (error) {
      console.error('Error matching volunteers:', error);
      setError('Failed to match volunteers');
    }
  };

  //if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="volunteer-matching-container">
      <h2>Event Volunteer Matching</h2>
      <table className="events-table">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Event Description</th>
            <th>Location</th>
            <th>Required Skills</th>
            <th>Urgency</th>
            <th>Event Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td>{event.eventName}</td>
              <td>{event.eventDescription}</td>
              <td>{event.location}</td>
              <td>{Array.isArray(event.requiredSkills) ? event.requiredSkills.join(', ') : 'N/A'}</td>
              <td>{event.urgency}</td>
              <td>{new Date(event.eventDate).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleMatchVolunteers(event._id)}>Match Volunteers</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="matched-volunteers-container">
        <h3>Matched Volunteers</h3>
        {Object.entries(matchedVolunteers).map(([eventId, volunteers]) => (
          <div key={eventId} className="matched-volunteers-section">
            <h4>Event ID: {eventId}</h4>
            <ul>
              {volunteers.map((volunteer) => (
                <li key={volunteer._id}>
                  {volunteer.fullName} - Skills: {volunteer.skills.join(', ')}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VolunteerMatching;
