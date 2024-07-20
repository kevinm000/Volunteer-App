import React, { useState, useEffect } from 'react';
import './index.css';

const VolunteerHistory = () => {
  // Mock data for volunteer history
  const mockVolunteerHistory = [
    {
      volunteerName: 'John Doe',
      eventName: 'Community Clean-Up',
      eventDescription: 'Cleaning up the local park',
      location: 'Central Park',
      requiredSkills: ['Teamwork', 'Communication'],
      urgency: 'Medium',
      eventDate: '2023-06-15',
      participationStatus: 'Attended'
    },
    {
      volunteerName: 'Jane Smith',
      eventName: 'Food Drive',
      eventDescription: 'Collecting and distributing food to the needy',
      location: 'Downtown Community Center',
      requiredSkills: ['Organizing', 'Empathy'],
      urgency: 'High',
      eventDate: '2023-06-20',
      participationStatus: 'Attended'
    },
   
  ];

  const [volunteerHistory, setVolunteerHistory] = useState([]);

  useEffect(() => {
    // Using mock data instead of fetching from backend
    setVolunteerHistory(mockVolunteerHistory);
  }, []);

  return (
    <div className="volunteer-history-container">
      <h2>Volunteer History</h2>
      <table className="volunteer-history-table">
        <thead>
          <tr>
            <th>Volunteer Name</th>
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
              <td>{history.volunteerName}</td>
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
