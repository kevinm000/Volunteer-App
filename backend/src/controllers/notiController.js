let notifications = [];

exports.sendNotification = (req, res) => {
  const { volunteerId, message } = req.body;
  const newNotification = { id: notifications.length + 1, volunteerId, message, isNew: true, date: new Date() };
  notifications.push(newNotification);
  res.status(201).json(newNotification);
};

exports.getNotifications = (req, res) => {
  res.status(200).json(notifications);
};

exports.deleteNotification = (req, res) => {
  const { id } = req.params;
  const notificationIndex = notifications.findIndex(notification => notification.id == id);
  if (notificationIndex > -1) {
    notifications.splice(notificationIndex, 1);
    res.status(200).json({ message: 'Notification deleted successfully' });
  } else {
    res.status(404).json({ message: 'Notification not found' });
  }
};

