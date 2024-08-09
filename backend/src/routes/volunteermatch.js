const express = require('express');
const router = express.Router();
const volunteerMatchController = require('../controllers/volunteermatchController');

// Create a new volunteer match event
router.post('/create', volunteerMatchController.createEvent);

// Get all events
router.get('/events', volunteerMatchController.getAllEvents);

// Match volunteers to an event based on event requirements
router.get('/match/:eventId', volunteerMatchController.matchVolunteers);

// Get matched volunteers for a specific event
router.get('/matched-volunteers/:eventId', volunteerMatchController.getMatchedVolunteers);

// Get an event by ID
router.get('/:id', volunteerMatchController.getEventById);

// Update an event by ID
router.put('/:id', volunteerMatchController.updateEvent);

// Delete an event by ID
router.delete('/:id', volunteerMatchController.deleteEvent);

module.exports = router;
