const UserCredentials = require('../models/UserCredentials');
const UserProfile = require('../models/UserProfile'); // Import the UserProfile model
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Register a new user
const register = async (req, res) => {
  const { email, password, fullName, address1, address2, city, state, zipCode, skills, preferences, availability } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await UserCredentials.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Create a new user
    const newUser = new UserCredentials({ email, password });
    await newUser.save();

    // Create a new user profile
    const userProfile = new UserProfile({
      userId: newUser._id, // Link the profile to the new user
      fullName,
      address1,
      address2,
      city,
      state,
      zipCode,
      skills,
      preferences,
      availability
    });
    await userProfile.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login a user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await UserCredentials.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the entered password with the stored hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    // Optionally include user profile information
    const userProfile = await UserProfile.findOne({ userId: user._id });
    res.json({ token, user: { email: user.email, profile: userProfile }, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { register, login };
