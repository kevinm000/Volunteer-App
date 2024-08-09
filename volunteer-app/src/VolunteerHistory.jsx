import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import './index.css';

const VolunteerHistory = () => {
  const { user } = useAuth();
  const [volunteerHistory, setVolunteerHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVolunteerHistory = async (volunteerId) => {
      try {
        const response = await fetch('/api/volunteer-history', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
          body: JSON.stringify({ volunteerId }), // Send volunteerId in the request body
        });

        if (!response.ok) {
          throw new Error('Failed to fetch volunteer history');
        }

        const historyData = await response.json();

        // Fetch event details for each history record by event ID
        const eventDetailsPromises = historyData.map(async (history) => {
          try {
            const eventResponse = await fetch(`/api/volunteer-history/event/${eventId}`, {
              headers: {
                'Authorization': `Bearer ${user.token}`,
              },
            });

            if (!eventResponse.ok) {
              throw new Error(`Failed to fetch details for event ${eventId}`);
            }

            const eventData = await eventResponse.json();
            return { ...history, eventDetails: eventData }; // Attach event details
          } catch (error) {
            // Handle errors in event fetching
            console.error(error.message);
            return { ...history, eventDetails: null }; // Default to null if there's an error
          }
        });

        const detailedHistoryData = await Promise.all(eventDetailsPromises);
        setVolunteerHistory(detailedHistoryData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user && user._id) {
      fetchVolunteerHistory(user._id);
    }
  }, [user]);

  //if (loading) return <p>Loading...</p>; // Provide feedback while loading
  if (error) return <p>{error}</p>;

  return (
    <div className="volunteer-history-container">
      <h2>Volunteer History</h2>
      <table className="volunteer-history-table">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Event Description</th>
            <th>Location</th>
            <th>Required Skills</th>
            <th>Urgency</th>
            <th>Event Date</th>
            <th>Participation Status</th>
          </tr>
        </thead>
        <tbody>
          {volunteerHistory.map((history, index) => (
            <tr key={index}>
              <td>{history.eventDetails?.eventName || 'N/A'}</td>
              <td>{history.eventDetails?.eventDescription || 'N/A'}</td>
              <td>{history.eventDetails?.location || 'N/A'}</td>
              <td>{Array.isArray(history.eventDetails?.requiredSkills) ? history.eventDetails.requiredSkills.join(', ') : 'N/A'}</td>
              <td>{history.eventDetails?.urgency || 'N/A'}</td>
              <td>{history.eventDetails?.eventDate ? new Date(history.eventDetails.eventDate).toLocaleDateString() : 'N/A'}</td>
              <td>{history.participationStatus || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VolunteerHistory;
