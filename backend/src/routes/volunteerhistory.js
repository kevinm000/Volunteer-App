const express = require('express');
const router = express.Router();
const volunteerhistoryController = require('../controllers/volunteerhistoryController');

// Create a new volunteer history record
router.post('/create', volunteerhistoryController.createRecord);

// Get all volunteer history records
router.get('/', volunteerhistoryController.getAllRecords);

// Get volunteer history by volunteer ID
router.get('/volunteer/:id', volunteerhistoryController.getRecordsByVolunteerId);

// Get volunteer history by event ID
router.get('/event/:id', volunteerhistoryController.getRecordsByEventId);

// Update a volunteer history record by ID
router.put('/:id', volunteerhistoryController.updateRecord);

// Delete a volunteer history record by ID
router.delete('/:id', volunteerhistoryController.deleteRecord);

module.exports = router;
