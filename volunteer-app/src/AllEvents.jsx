import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import './index.css';

const AllEvents = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/volunteer-match/events');
        setEvents(response.data);
      } catch (error) {
        setError('Failed to fetch events');
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleParticipated = async (eventId) => {
    try {
      if (!user || !user.token) {
        throw new Error('User not authenticated');
      }

      await axios.post(
        'http://localhost:3000/api/volunteer-history',
        {
          volunteerId: user._id, // Assuming user._id is the ID of the authenticated user
          eventId: eventId,
          participationStatus: 'Attended', // You can change the status as needed
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
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
          {events.map((event) => (
            <tr key={event._id}>
              <td>{event.eventName}</td>
              <td>{event.eventDescription}</td>
              <td>{event.location}</td>
              <td>{event.requiredSkills.join(', ')}</td>
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
