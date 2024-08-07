import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import './index.css';

const VolunteerHistory = () => {
  const { user } = useAuth(); // Get user data from context
  const [volunteerHistory, setVolunteerHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVolunteerHistory = async () => {
      try {
        if (!user || !user.token) {
          throw new Error('User not authenticated');
        }

        const response = await axios.get('http://localhost:3000/api/volunteer-history', {
          headers: { Authorization: `Bearer ${user.token}` } // Use the token from context
        });

        setVolunteerHistory(response.data);
      } catch (err) {
        setError('Failed to fetch volunteer history');
        console.error('Error fetching volunteer history:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteerHistory();
  }, [user]);

  if (loading) return <p>Loading...</p>;
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
              <td>{history.eventName}</td>
              <td>{history.eventDescription}</td>
              <td>{history.location}</td>
              <td>{history.requiredSkills.join(', ')}</td>
              <td>{history.urgency}</td>
              <td>{history.eventDate}</td>
              <td>{history.participationStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VolunteerHistory;
