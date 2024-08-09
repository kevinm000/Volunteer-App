import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (token && storedUser) {
      // Validate token and fetch user profile
      axios.get('http://localhost:3000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        // Token is valid, use the fetched user data
        setUser({ ...storedUser, token });
      })
      .catch(() => {
        // Token or user info is invalid
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      });
    }
  }, []);

  const login = (userData) => {
    const { token, ...userInfo } = userData; // Separate token from user info

    // Debugging: Check if token and userInfo are correct
    console.log('Login Token:', token);
    console.log('Login User Info:', userInfo);

    // Set user state with token
    setUser({ ...userInfo, token });

    // Store user info without token
    localStorage.setItem('user', JSON.stringify(userInfo));

    // Store token separately
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
