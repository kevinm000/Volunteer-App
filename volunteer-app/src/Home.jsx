import React from 'react';
import { useAuth } from './AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div>
      {user ? (
        <h1>Hello, {user.profile.fullName}</h1>
      ) : (
        <h1>Welcome to our Volunteer App</h1>
      )}
    </div>
  );
};

export default Home;
