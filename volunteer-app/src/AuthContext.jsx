import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [volunteerHistory, setVolunteerHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [errorHistory, setErrorHistory] = useState(null);

  useEffect(() => {
    // Load user from localStorage if available
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:3000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => setUser(response.data))
      .catch(() => localStorage.removeItem('token'));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const fetchVolunteerHistory = async (userId) => {
    try {
      setLoadingHistory(true);
  
      // Fetching volunteer history by user ID
      const response = await fetch('/api/volunteer-history', {
        method: 'POST', // Use POST method
        headers: {
          'Content-Type': 'application/json', // Set content type to JSON
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({ volunteerId: userId }), // Send volunteerId in the request body
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch volunteer history');
      }
  
      const historyData = await response.json();
  
      // For each volunteer history entry, fetch the event details
      const eventDetailsPromises = historyData.map(async (history) => {
        const eventResponse = await fetch(`/api/volunteer-history/event/${history.eventId}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });
  
        if (!eventResponse.ok) {
          throw new Error(`Failed to fetch details for event ${history.eventId}`);
        }
  
        const eventDetails = await eventResponse.json();
        return {
          ...history,
          eventDetails, // Attach the fetched event details to each history entry
        };
      });
  
      const detailedHistoryData = await Promise.all(eventDetailsPromises);
      setVolunteerHistory(detailedHistoryData);
  
    } catch (error) {
      setErrorHistory(error.message);
    } finally {
      setLoadingHistory(false);
    }
  };
  
  
  

  return (
    <AuthContext.Provider value={{ user, login, logout, volunteerHistory, fetchVolunteerHistory, loadingHistory, errorHistory }}>
      {children}
    </AuthContext.Provider>
  );
};
