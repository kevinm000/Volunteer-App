const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const EventDetails = require('../models/EventDetails'); // Import the EventDetails model

// Route to create a new event
router.post('/create', eventController.createEvent);

// Route to get all events
router.get('/', eventController.getAllEvents);

// Route to get a single event by ID
router.get('/:id', eventController.getEventById);

// Route to update an event by ID
router.put('/:id', eventController.updateEvent);

// Route to delete an event by ID
router.delete('/:id', eventController.deleteEvent);

module.exports = router;