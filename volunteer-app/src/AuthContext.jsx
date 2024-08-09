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
      const response = await fetch(`/api/volunteer-history/volunteer/${userId}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch volunteer history');
      }
  
      const data = await response.json();
      setVolunteerHistory(data);
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
