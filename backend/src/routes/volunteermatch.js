const express = require('express');
const router = express.Router();
const volunteermatchController = require('../controllers/volunteermatchController');

// Create a new volunteer match
router.post('/', volunteermatchController.createEvent);

// Get all matched profiles
router.get('/', volunteermatchController.getMatchedProfiles);

// Get an event by ID
router.get('/:id', volunteermatchController.getEventById);

// Update an event by ID
router.put('/:id', volunteermatchController.updateEvent);

// Delete an event by ID
router.delete('/:id', volunteermatchController.deleteEvent);

module.exports = router;
