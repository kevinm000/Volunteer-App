import React from 'react';
import { Link } from 'react-router-dom';
import Notifications from './Notifications';
import './index.css';

function Header() {
    return (
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="logo">The Volunteer&trade;</h1>
          </div>
          <nav className="nav">
            <ul className="nav-list">
              <li className="nav-item"><Link to="/">Home</Link></li>
              <li className="nav-item"><Link to="/login">Login</Link></li>
              <li className="nav-item"><Link to="/registration">Registration</Link></li>
              <li className="nav-item"><Link to="/profile">Profile Management</Link></li>
              <li className="nav-item"><Link to="/event-management">Event Management</Link></li>
              <li className="nav-item"><Link to="/volunteer-matching">Volunteer Matching</Link></li>
              <li className="nav-item"><Link to="/volunteer-history">Volunteer History</Link></li>
            </ul>
          </nav>
          <div className="header-right">
            <Notifications />
          </div>
        </div>
      </header>
    );
}

export default Header;

