import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCircle } from '@fortawesome/free-solid-svg-icons';
import './index.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New event assigned to you.' },
    { id: 2, message: 'Event details updated.' },
    { id: 3, message: 'Reminder: Event starting soon.' },
  ]);
  const [isBellClicked, setIsBellClicked] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(notifications.length > 0);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleBellClick = () => {
    setIsBellClicked(true);
    setHasNewNotifications(false);
    setShowNotifications(!showNotifications);
  };

  useEffect(() => {
    if (isBellClicked) {
      setHasNewNotifications(false);
    }
  }, [isBellClicked]);

  return (
    <div className="notification-bell">
      <div className="bell-icon-container" onClick={handleBellClick}>
        <FontAwesomeIcon icon={faBell} className="bell-icon" />
        {hasNewNotifications && <FontAwesomeIcon icon={faCircle} className="new-notification-icon" />}
      </div>
      {showNotifications && (
        <div className="notifications-popup">
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
