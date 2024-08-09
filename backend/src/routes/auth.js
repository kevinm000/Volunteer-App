const express = require('express');
const router = express.Router();
const { register, login, getCurrentUser} = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');
// Define route to get current user
router.get('/me', authenticateToken, getCurrentUser);
// Register a new user
router.post('/register', register);

// Login a user
router.post('/login', login);

module.exports = router;
