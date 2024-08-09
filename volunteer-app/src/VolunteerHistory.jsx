import React, { useEffect } from 'react';
import { useAuth } from './AuthContext';
import './index.css';

const VolunteerHistory = () => {
  const { user, volunteerHistory, fetchVolunteerHistory, loadingHistory, errorHistory } = useAuth();

  useEffect(() => {
    if (user && user.token) {
      fetchVolunteerHistory(user._id); // Pass user ID to fetch history
    }
  }, [user, fetchVolunteerHistory]);

  if (loadingHistory) return <p>Loading...</p>;
  if (errorHistory) return <p>{errorHistory}</p>;

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
              <td>{history.eventId.eventName || 'N/A'}</td>
              <td>{history.eventId.eventDescription || 'N/A'}</td>
              <td>{history.eventId.location || 'N/A'}</td>
              <td>{Array.isArray(history.eventId.requiredSkills) ? history.eventId.requiredSkills.join(', ') : 'N/A'}</td>
              <td>{history.eventId.urgency || 'N/A'}</td>
              <td>{history.eventId.eventDate ? new Date(history.eventId.eventDate).toLocaleDateString() : 'N/A'}</td>
              <td>{history.participationStatus || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VolunteerHistory;
