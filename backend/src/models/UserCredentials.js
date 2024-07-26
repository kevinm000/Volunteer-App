const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// UserCredentials Schema
const userCredentialsSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String },
  address1: { type: String },
  address2: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
  skills: { type: [String] },
  preferences: { type: [String] },
  availability: { type: [String] }
});

// Pre-save hook to hash the password before saving
userCredentialsSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userCredentialsSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('UserCredentials', userCredentialsSchema);
