// src/tests/profileController.test.js
const request = require('supertest');
const app = require('../../server'); // Adjust the path to your server file
const mongoose = require('mongoose');
const UserProfile = require('../models/UserProfile');

describe('Profile Controller', () => {
  let server;
  
  beforeAll(async () => {
    server = app.listen(4001); // Ensure the server runs on a different port for testing
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    server.close();
  });

  const profileData = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    skills: ['JavaScript', 'React'],
    location: 'New York',
  };

  test('should create a new profile successfully', async () => {
    const response = await request(app).post('/api/profiles').send(profileData);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name', 'John Doe');
  });

  test('should return 400 if profile creation fails', async () => {
    jest.spyOn(UserProfile.prototype, 'save').mockImplementationOnce(() => {
      throw new Error('Mocked error');
    });
    const response = await request(app).post('/api/profiles').send(profileData);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Mocked error');
  });

  test('should get profile by ID', async () => {
    const profileResponse = await request(app).post('/api/profiles').send(profileData);
    const profileId = profileResponse.body._id;
    const response = await request(app).get(`/api/profiles/${profileId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'John Doe');
  });

  test('should return 404 for non-existent profile by ID', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const response = await request(app).get(`/api/profiles/${nonExistentId}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'User not found');
  });

  test('should return 500 for server errors during fetching profile by ID', async () => {
    jest.spyOn(UserProfile, 'findById').mockImplementationOnce(() => {
      throw new Error('Mocked error');
    });
    const nonExistentId = new mongoose.Types.ObjectId();
    const response = await request(app).get(`/api/profiles/${nonExistentId}`);
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Mocked error');
  });
});
