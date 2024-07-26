import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCircle } from '@fortawesome/free-solid-svg-icons';
import io from 'socket.io-client';
import './index.css';

// Initialize Socket.IO client
const socket = io('http://localhost:3000', {
  transports: ['websocket'], // Ensure WebSocket transport is used
});

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch notifications and set up socket listeners
  useEffect(() => {
    fetchNotifications();

    // Listen for new notifications
    socket.on('new-notification', (notification) => {
      setNotifications((prevNotifications) => [notification, ...prevNotifications]);
    });

    // Clean up socket listener on component unmount
    return () => {
      socket.off('new-notification');
    };
  }, []);

  // Fetch notifications from the server
  const fetchNotifications = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/notifications');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Delete a notification
  const deleteNotification = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/notifications/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== id));
      } else {
        console.error('Failed to delete notification');
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  // Handle bell icon click
  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
    acknowledgeNotifications();
  };

  // Handle clicks outside the dropdown
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowNotifications(false);
    }
  };

  // Acknowledge notifications when the bell is clicked
  const acknowledgeNotifications = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({ ...notification, isNew: false }))
    );
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const newNotifications = notifications.filter((notification) => notification.isNew);

  return (
    <div className="notification-bell" ref={dropdownRef}>
      <div className="bell-icon-container" onClick={handleBellClick}>
        <FontAwesomeIcon icon={faBell} className="bell-icon" />
        {newNotifications.length > 0 && <FontAwesomeIcon icon={faCircle} className="new-notification-icon" />}
      </div>
      {showNotifications && (
        <div className="notifications-popup">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification.id} className="notification-item">
                {notification.message}
                <button onClick={() => deleteNotification(notification.id)}>Delete</button>
              </div>
            ))
          ) : (
            <div className="notification-item">No new notifications</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
