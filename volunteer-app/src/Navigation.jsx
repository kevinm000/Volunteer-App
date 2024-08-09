import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Navigation = () => {
  return (
    <nav className="navigation">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/registration">Registration</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/all-events">All Events</Link></li>
        <li><Link to="/event-management">Event Management</Link></li>
        <li><Link to="/profile-management">Profile Management</Link></li>
        <li><Link to="/volunteer-matching">Volunteer Matching</Link></li>
        <li><Link to="/notifications">Notifications</Link></li>
        <li><Link to="/volunteer-history">Volunteer History</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
