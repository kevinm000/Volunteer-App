import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import './index.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New event assigned to you.' },
    { id: 2, message: 'Event details updated.' },
    { id: 3, message: 'Reminder: Event starting soon.' },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="notification-bell">
      <FontAwesomeIcon icon={faBell} className="bell-icon" onClick={toggleDropdown} />
      {isOpen && (
        <div className="dropdown">
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <div key={notification.id} className="notification-item">
                {notification.message}
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
