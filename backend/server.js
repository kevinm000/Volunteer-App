const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const authRoutes = require('./src/routes/auth');
const profileRoutes = require('./src/routes/profile');
const eventRoutes = require('./src/routes/event');
const notificationRoutes = require('./src/routes/noti');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.post('/api/notifications/send', (req, res) => {
  const { volunteerId, message } = req.body;
  const newNotification = { id: notifications.length + 1, volunteerId, message, isNew: true, date: new Date() };
  notifications.push(newNotification);

  io.emit('new-notification', newNotification);

  res.status(201).json(newNotification);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
