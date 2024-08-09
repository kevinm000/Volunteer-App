
const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserCredentials', required: true },
  fullName: { type: String, required: true, maxlength: 50 },
  address1: { type: String, required: true, maxlength: 100 },
  address2: { type: String, maxlength: 100 },
  city: { type: String, required: true, maxlength: 100 },
  state: { type: String, required: true, maxlength: 2 },
  zipCode: { type: String, required: true, minlength: 5, maxlength: 9 },
  skills: { type: [String], required: true },
  preferences: { type: String, maxlength: 500 },
  availability: { type: [Date], required: true }
});

module.exports = mongoose.model('UserProfile', userProfileSchema);
