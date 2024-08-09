const mongoose = require('mongoose');

// VolunteerHistory Schema
const volunteerHistorySchema = new mongoose.Schema({
  volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'EventDetails', required: true },
  participationStatus: { type: String, required: true }, // e.g., 'Attended', 'No-show', 'Cancelled'
  feedback: { type: String } // Optional feedback field
});

// Export the VolunteerHistory model
module.exports = mongoose.model('VolunteerHistory', volunteerHistorySchema);
