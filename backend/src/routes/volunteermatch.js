const express = require('express');
const router = express.Router();
const volunteerMatchController = require('../controllers/volunteermatchController');

// Create a new volunteer match
router.post('/create', volunteerMatchController.createEvent);

// Get all events
router.get('/events', volunteerMatchController.getAllEvents); // Add this line

// Get all matched profiles
router.get('/matched-profiles', volunteerMatchController.getMatchedProfiles);

// Get an event by ID
router.get('/:id', volunteerMatchController.getEventById);

// Update an event by ID
router.put('/:id', volunteerMatchController.updateEvent);

// Delete an event by ID
router.delete('/:id', volunteerMatchController.deleteEvent);

module.exports = router;
