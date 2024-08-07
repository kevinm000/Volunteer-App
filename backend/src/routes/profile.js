const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');



// Get user profile by ID
router.get('/:id', profileController.getProfileById);

module.exports = router;
