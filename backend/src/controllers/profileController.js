const UserProfile = require('../models/UserProfile');
const UserCredentials = require('../models/UserCredentials');

// Get user profile by ID (ensure the user is authenticated and authorized)
const getProfileById = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch user profile
    const userProfile = await UserProfile.findOne({ userId: id });
    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    res.status(200).json(userProfile);
  } catch (error) {
    console.error('Error fetching profile by ID:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProfileById
};
