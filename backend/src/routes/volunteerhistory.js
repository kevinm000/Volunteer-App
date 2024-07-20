const express = require('express');
const router = express.Router();
const volunteerhistoryController = require('../controllers/volunteerhistoryController');

router.get('/', volunteerhistoryController.getAllEvents);
router.get('/:id', volunteerhistoryController.getEventById);
router.post('/', volunteerhistoryController.createEvent);
router.put('/:id', volunteerhistoryController.updateEvent);
router.delete('/:id', volunteerhistoryController.deleteEvent);

module.exports = router;

