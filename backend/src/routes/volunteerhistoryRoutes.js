const express = require('express');
const router = express.Router();
const { createEvent, getAllEvents, getMatchedProfiles, getEventById, updateEvent, deleteEvent } = require('../controllers/volunteermatchController');
const { createRecord, getAllRecords, getRecordsByVolunteerId, getRecordsByEventId, updateRecord, deleteRecord } = require('../controllers/volunteerHistoryController');

// Fetch all events
router.get('/api/volunteer-match/events', getAllEvents);

// Add an event to volunteer history
router.post('/api/volunteer-history', createRecord);

// Other routes
router.post('/api/volunteer-match/create', createEvent);
router.get('/api/volunteer-match/:id', getEventById);
router.put('/api/volunteer-match/:id', updateEvent);
router.delete('/api/volunteer-match/:id', deleteEvent);

module.exports = router;
