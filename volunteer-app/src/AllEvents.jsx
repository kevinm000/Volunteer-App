import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import './index.css';

const AllEvents = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirect to login if user is not authenticated
      return;
    }

    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/events', {
          headers: { Authorization: `Bearer ${user.token}` }, // Use token for authentication
        });
        setEvents(response.data);
      } catch (error) {
        setError('Failed to fetch events');
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [user, navigate]);

  const handleParticipated = async (eventId) => {
    try {
      
  
      // Prompt user for feedback
      const feedback = prompt('Please provide feedback (optional):');
  
      // Ensure `volunteerId` is defined and correct
      const volunteerId = user.profile._id;
      if (!volunteerId) {
        throw new Error('User ID is missing');
      }
  
      const response = await axios.post(
        'http://localhost:3000/api/volunteer-history', // Use the updated endpoint
        {
          volunteerId, // Send volunteerId in the request body
          eventId,
          participationStatus: 'Attended',
          feedback: feedback || ''
        },
        {
          headers: { Authorization: `Bearer ${user.token}` } // Use token for authentication
        }
      );
  
      alert('Event added to volunteer history');
    } catch (err) {
      console.error('Error adding event to volunteer history:', err);
      alert('Failed to add event to volunteer history');
    }
  };
  
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="all-events-container">
      <h2>All Events</h2>
      <table className="all-events-table">
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
          {events.map((event, index) => (
            <tr key={index}>
              <td>{event.eventName}</td>
              <td>{event.eventDescription}</td>
              <td>{event.location}</td>
              <td>{Array.isArray(event.requiredSkills) ? event.requiredSkills.join(', ') : 'N/A'}</td>
              <td>{event.urgency}</td>
              <td>{new Date(event.eventDate).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleParticipated(event._id)}>Participated</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllEvents;
