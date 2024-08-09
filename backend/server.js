const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const PDFDocument = require('pdfkit');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs'); // For file handling

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

// PDF generation endpoint
app.post('/api/reports/generate-pdf', (req, res) => {
  const volunteerHistory = req.body;

  const doc = new PDFDocument();
  const filePath = 'volunteer_report.pdf';
  const writeStream = fs.createWriteStream(filePath);

  doc.pipe(writeStream);

  doc.fontSize(18).text('Volunteer History Report', { align: 'center' });
  doc.moveDown();

  volunteerHistory.forEach((history, index) => {
    doc.fontSize(12).text(`Volunteer Name: ${history.volunteerName}`);
    doc.text(`Event Name: ${history.eventName}`);
    doc.text(`Event Description: ${history.eventDescription}`);
    doc.text(`Location: ${history.location}`);
    doc.text(`Required Skills: ${history.requiredSkills.join(', ')}`);
    doc.text(`Urgency: ${history.urgency}`);
    doc.text(`Event Date: ${history.eventDate}`);
    doc.text(`Participation Status: ${history.participationStatus}`);
    doc.moveDown();
  });

  doc.end();

  writeStream.on('finish', () => {
    res.download(filePath, 'volunteer_report.pdf', (err) => {
      if (err) {
        console.error('Error downloading PDF file:', err);
        res.status(500).send('Failed to generate PDF');
      }
    });
  });
});

// CSV generation endpoint
app.post('/api/reports/generate-csv', async (req, res) => {
  const volunteerHistory = req.body;

  const csvWriter = createCsvWriter({
    path: 'volunteer_report.csv',
    header: [
      { id: 'volunteerName', title: 'Volunteer Name' },
      { id: 'eventName', title: 'Event Name' },
      { id: 'eventDescription', title: 'Event Description' },
      { id: 'location', title: 'Location' },
      { id: 'requiredSkills', title: 'Required Skills' },
      { id: 'urgency', title: 'Urgency' },
      { id: 'eventDate', title: 'Event Date' },
      { id: 'participationStatus', title: 'Participation Status' }
    ]
  });

  const records = volunteerHistory.map(history => ({
    volunteerName: history.volunteerName,
    eventName: history.eventName,
    eventDescription: history.eventDescription,
    location: history.location,
    requiredSkills: history.requiredSkills.join(', '),
    urgency: history.urgency,
    eventDate: history.eventDate,
    participationStatus: history.participationStatus
  }));

  await csvWriter.writeRecords(records);

  res.download('volunteer_report.csv', 'volunteer_report.csv', (err) => {
    if (err) {
      console.error('Error downloading CSV file:', err);
      res.status(500).send('Failed to generate CSV');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
