// src/models/VolunteerMatch.js
const mongoose = require('mongoose');

const volunteerMatchSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventDescription: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  requiredSkills: {
    type: [String], // Array of strings representing required skills
    required: true,
  },
  urgency: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  volunteers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming you have a User model for volunteers
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // User who created the event
    required: true,
  },
  status: {
    type: String,
    enum: ['Open', 'Closed', 'Cancelled'], // Event status
    default: 'Open',
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('VolunteerMatch', volunteerMatchSchema);
