const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Create a new user profile
router.post('/create', profileController.createProfile);

// Get user profile by ID
router.get('/:id', profileController.getProfileById);

module.exports = router;
