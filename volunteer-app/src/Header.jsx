import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header>
      <h1>Volunteer App</h1>
      <nav>
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/all-events">All Events</Link>
            <Link to="/event-management">Event Management</Link>
            <Link to="/profile-management">Profile Management</Link>
            <Link to="/volunteer-matching">Volunteer Matching</Link>
            <Link to="/notifications">Notifications</Link>
            <Link to="/volunteer-history">Volunteer History</Link>
            <button onClick={logout}>Sign Out</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/registration">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
