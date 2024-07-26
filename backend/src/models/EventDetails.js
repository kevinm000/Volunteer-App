const mongoose = require('mongoose');

// EventDetails Schema
const eventDetailsSchema = new mongoose.Schema({
  eventName: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true },
  location: { type: String, required: true },
  requiredSkills: { type: [String], required: true }, // Array of required skills
  urgency: { type: String, required: true }, // e.g., 'High', 'Medium', 'Low'
  eventDate: { type: Date, required: true }
});

// Export the EventDetails model
module.exports = mongoose.model('EventDetails', eventDetailsSchema);
