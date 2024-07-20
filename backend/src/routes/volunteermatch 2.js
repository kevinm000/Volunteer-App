const express = require('express');
const router = express.Router();
const volunteermatchController = require('../controllers/volunteermatchController');

// router.get('/', volunteermatchController.getAllEvents);
router.get('/', volunteermatchController.getMatchedProfiles);
router.get('/:id', volunteermatchController.getEventById);
router.post('/', volunteermatchController.createEvent);
router.put('/:id', volunteermatchController.updateEvent);
router.delete('/:id', volunteermatchController.deleteEvent); 

module.exports = router;
