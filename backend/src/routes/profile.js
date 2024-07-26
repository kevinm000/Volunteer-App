const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const UserProfile = require('../models/UserProfile'); // Import the UserProfile model

// Create a new user profile
router.post('/create', async (req, res) => {
  try {
    const userProfile = new UserProfile(req.body);
    await userProfile.save();
    res.status(201).json(userProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user profile by ID
router.get('/:id', async (req, res) => {
  try {
    const userProfile = await UserProfile.findById(req.params.id);
    if (!userProfile) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
