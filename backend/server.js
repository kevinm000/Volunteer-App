const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Adjust according to your frontend URL
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Middleware
app.use(express.json()); // Built-in JSON parser
app.use(cors({
  origin: 'http://localhost:5173', // Specify your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
  credentials: true // If you want to allow credentials (e.g., cookies, authorization headers)
}));

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error('MONGODB_URI is not defined in .env file');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(mongoURI, {
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

const authRoutes = require('./src/routes/auth');
const profileRoutes = require('./src/routes/profile');
const eventRoutes = require('./src/routes/event');
const notificationRoutes = require('./src/routes/noti');
const volunteermatchRoutes = require('./src/routes/volunteermatch');
const volunteerhistoryRoutes = require('./src/routes/volunteerhistory');
const reportRoutes = require('./src/routes/reportRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/volunteer-match', volunteermatchRoutes);
app.use('/api/volunteer-history', volunteerhistoryRoutes);
app.use('/api/reports', reportRoutes);

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
