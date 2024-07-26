const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const UserProfile = require('../models/UserProfile');
const profileController = require('../controllers/profileController');

app.use(express.json());
app.use('/api/profile', require('../routes/profileRoutes'));

// Mock data
const mockProfile = {
  name: 'John Doe',
  email: 'john@example.com',
  address: '123 Main St',
  phoneNumber: '123-456-7890'
};

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Profile Controller', () => {
  it('should create a new user profile', async () => {
    const response = await request(app)
      .post('/api/profile/create')
      .send(mockProfile);
    
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(mockProfile);
  });

  it('should get a user profile by ID', async () => {
    const newProfile = await request(app)
      .post('/api/profile/create')
      .send(mockProfile);

    const response = await request(app).get(`/api/profile/${newProfile.body._id}`);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(mockProfile);
  });
});
