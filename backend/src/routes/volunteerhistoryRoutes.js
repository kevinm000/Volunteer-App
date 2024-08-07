// src/routes/volunteerhistoryRoutes.js
const express = require('express');
const router = express.Router();
const volunteerHistoryController = require('../controllers/volunteerhistoryController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, volunteerHistoryController.getAllRecords);
router.post('/', authMiddleware, volunteerHistoryController.createRecord);
router.get('/volunteer/:id', authMiddleware, volunteerHistoryController.getRecordsByVolunteerId);
router.get('/event/:id', authMiddleware, volunteerHistoryController.getRecordsByEventId);
router.put('/:id', authMiddleware, volunteerHistoryController.updateRecord);
router.delete('/:id', authMiddleware, volunteerHistoryController.deleteRecord);

module.exports = router;
