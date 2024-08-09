import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

<<<<<<< HEAD
  if (!user || !user.token) {
=======
  if (!user) {
>>>>>>> juan
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
