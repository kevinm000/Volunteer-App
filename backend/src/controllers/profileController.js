const UserProfile = require('../models/UserProfile');

// Create a new user profile
const createProfile = async (req, res) => {
  try {
    const userProfile = new UserProfile(req.body);
    await userProfile.save();
    res.status(201).json(userProfile);
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(400).json({ message: error.message });
  }
};

// Get user profile by ID
const getProfileById = async (req, res) => {
  try {
    const userProfile = await UserProfile.findById(req.params.id);
    if (!userProfile) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(userProfile);
  } catch (error) {
    console.error('Error fetching profile by ID:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProfile,
  getProfileById
};
