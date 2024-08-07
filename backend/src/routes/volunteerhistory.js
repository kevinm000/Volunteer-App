const express = require('express');
const router = express.Router();
const volunteerhistoryController = require('../controllers/volunteerhistoryController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new volunteer history record
router.post('/create', authMiddleware, volunteerhistoryController.createRecord); // Add authMiddleware

// Get all volunteer history records
router.get('/', authMiddleware, volunteerhistoryController.getAllRecords); // Add authMiddleware

// Get volunteer history by volunteer ID
router.get('/volunteer/:id', authMiddleware, volunteerhistoryController.getRecordsByVolunteerId); // Add authMiddleware

// Get volunteer history by event ID
router.get('/event/:id', authMiddleware, volunteerhistoryController.getRecordsByEventId); // Add authMiddleware

// Update a volunteer history record by ID
router.put('/:id', authMiddleware, volunteerhistoryController.updateRecord); // Add authMiddleware

// Delete a volunteer history record by ID
router.delete('/:id', authMiddleware, volunteerhistoryController.deleteRecord); // Add authMiddleware

module.exports = router;
