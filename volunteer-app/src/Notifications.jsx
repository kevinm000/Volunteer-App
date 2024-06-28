import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCircle } from '@fortawesome/free-solid-svg-icons';
import './index.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New event assigned to you.', isNew: true },
    { id: 2, message: 'Event details updated.', isNew: true },
    { id: 3, message: 'Reminder: Event starting soon.', isNew: true },
    { id: 4, message: 'Event registration deadline approaching.', isNew: false },
    { id: 5, message: 'You have been unassigned from an event.', isNew: false },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
    acknowledgeNotifications();
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowNotifications(false);
    }
  };

  const acknowledgeNotifications = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, isNew: false }))
    );
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const newNotifications = notifications.filter(notification => notification.isNew);

  return (
    <div className="notification-bell" ref={dropdownRef}>
      <div className="bell-icon-container" onClick={handleBellClick}>
        <FontAwesomeIcon icon={faBell} className="bell-icon" />
        {newNotifications.length > 0 && <FontAwesomeIcon icon={faCircle} className="new-notification-icon" />}
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
