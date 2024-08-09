import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const { user, logout } = useAuth(); // Access the user and logout function from context
  const [showNotifications, setShowNotifications] = useState(false); // State to toggle the notifications dropdown

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <div style={logoStyle}>
          <Link to="/" style={linkStyle}>The Volunteer™</Link>
        </div>
        <ul style={ulStyle}>
          {!user ? (
            // If not logged in, show only Login and Register
            <>
              <li style={liStyle}>
                <Link to="/login" style={linkStyle}>Login</Link>
              </li>
              <li style={liStyle}>
                <Link to="/registration" style={linkStyle}>Register</Link>
              </li>
            </>
          ) : (
            // If logged in, show the full menu with bell icon
            <>
              <li style={liStyle}>
                <Link to="/profile" style={linkStyle}>Profile</Link>
              </li>
              <li style={liStyle}>
                <Link to="/all-events" style={linkStyle}>All Events</Link>
              </li>
              <li style={liStyle}>
                <Link to="/event-management" style={linkStyle}>Event Management</Link>
              </li>
              <li style={liStyle}>
                <Link to="/profile-management" style={linkStyle}>Profile Management</Link>
              </li>
              <li style={liStyle}>
                <Link to="/volunteer-matching" style={linkStyle}>Volunteer Matching</Link>
              </li>
              <li style={liStyle}>
                {/* Bell icon for notifications */}
                <div style={notificationContainerStyle}>
                  <FontAwesomeIcon icon={faBell} onClick={toggleNotifications} style={bellIconStyle} />
                  {showNotifications && (
                    <div style={notificationDropdownStyle}>
                      <p>No new notifications</p>
                      {/* Here you would map through your actual notifications */}
                    </div>
                  )}
                </div>
              </li>
              <li style={liStyle}>
                <Link to="/volunteer-history" style={linkStyle}>Volunteer History</Link>
              </li>
              <li style={liStyle}>
                {/* Add a logout button */}
                <button onClick={logout} style={buttonStyle}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

// Styles
const headerStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  backgroundColor: '#333', // Dark background for the header
  color: '#fff',
  padding: '10px 0',
  zIndex: 1000, // Ensure it stays on top
};

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px',
};

const logoStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
};

const ulStyle = {
  listStyle: 'none',
  display: 'flex',
  gap: '15px',
  margin: 0,
  padding: 0,
};

const liStyle = {
  display: 'inline',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
};

const buttonStyle = {
  background: 'transparent',
  border: 'none',
  color: '#fff',
  cursor: 'pointer',
};

const notificationContainerStyle = {
  position: 'relative',
};

const bellIconStyle = {
  cursor: 'pointer',
  fontSize: '1.25rem',
};

const notificationDropdownStyle = {
  position: 'absolute',
  top: '30px',
  right: '0px',
  backgroundColor: '#fff',
  color: '#333',
  padding: '10px',
  borderRadius: '5px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  zIndex: 1001,
  width: '200px',
};

export default Header;
