// src/routes/volunteerhistoryRoutes.js
const express = require('express');
const router = express.Router();
const volunteerHistoryController = require('../controllers/volunteerhistoryController');

router.get('/', volunteerHistoryController.getAllRecords);
router.post('/', volunteerHistoryController.createRecord);
router.get('/volunteer/:id', volunteerHistoryController.getRecordsByVolunteerId);
router.get('/event/:id', volunteerHistoryController.getRecordsByEventId);
router.put('/:id', volunteerHistoryController.updateRecord);
router.delete('/:id', volunteerHistoryController.deleteRecord);

module.exports = router;
