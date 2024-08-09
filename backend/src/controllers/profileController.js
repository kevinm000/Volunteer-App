// src/controllers/profileController.js
const UserProfile = require('../models/UserProfile');

const getProfileById = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from middleware

    // Fetch user profile by user ID
    const userProfile = await UserProfile.findOne({ userId: userId });
    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    res.status(200).json(userProfile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProfileById,
};
