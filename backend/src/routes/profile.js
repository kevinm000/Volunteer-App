// src/routes/profile.js
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authenticateToken = require('../middleware/authMiddleware'); // Adjust path as necessary

// Protect the route with authentication middleware
router.get('/', authenticateToken, profileController.getProfileById);

module.exports = router;
