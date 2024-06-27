
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>My website</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/registration">Registration</Link></li>
          <li><Link to="/profile">Profile Management</Link></li>
          <li><Link to="/events">Event Management</Link></li>
          <li><Link to="/volunteer-matching">Volunteer Matching</Link></li>
          <li><Link to="/notifications">Notifications</Link></li>
          <li><Link to="/history">Volunteer History</Link></li>
        </ul>
      </nav>
      <hr />
    </header>
  );
}

export default Header;
