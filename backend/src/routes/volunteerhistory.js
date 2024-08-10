const express = require('express');
const router = express.Router();
const { 
  createRecord, 
  getAllRecords, 
  getRecordsByVolunteerId, 
  getRecordsByEventId, 
  updateRecord, 
  deleteRecord 
} = require('../controllers/volunteerHistoryController');

// Define routes for volunteer history
router.post('/', createRecord); // Use `createRecord` function to create a new record
router.get('/', getAllRecords); // Retrieves all volunteer history records
router.get('/volunteer/:id', getRecordsByVolunteerId); // Retrieves records by volunteer ID
router.get('/event/:id', getRecordsByEventId); // Retrieves records by event ID
router.put('/:id', updateRecord); // Updates a record by ID
router.delete('/:id', deleteRecord); // Deletes a record by ID

module.exports = router;
