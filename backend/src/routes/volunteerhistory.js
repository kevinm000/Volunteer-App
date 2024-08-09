const express = require('express');
const router = express.Router();
const { createRecord, getAllRecords, getRecordsByVolunteerId, getRecordsByEventId, updateRecord, deleteRecord } = require('../controllers/volunteerHistoryController');

// Define routes for volunteer history
router.post('/', createRecord); // Remove `:volunteerId` from the route
router.get('/', getAllRecords);
router.get('/volunteer/:id', getRecordsByVolunteerId);
router.get('/event/:id', getRecordsByEventId);
router.put('/:id', updateRecord);
router.delete('/:id', deleteRecord);

module.exports = router;
