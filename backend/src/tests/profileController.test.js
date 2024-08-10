const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const UserProfile = require('../models/UserProfile');
const { getProfileById } = require('../controllers/profileController');

const app = express();
app.use(express.json());

// Mock route to test the controller
app.get('/api/profiles/me', (req, res, next) => {
  req.user = { id: 'mockedUserId' }; // Mocked user ID from middleware
  next();
}, getProfileById);

// Mock JWT secret
process.env.JWT_SECRET = 'mockedSecret';

beforeAll(async () => {
  // Connect to an in-memory test database (or a dedicated test database)
  await mongoose.connect('mongodb://localhost:27017/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  // Clear the UserProfile collection before each test
  await UserProfile.deleteMany({});
});

describe('Profile Controller - getProfileById', () => {
  test('should successfully fetch a profile by ID', async () => {
    // Arrange: create a mock user profile
    const profileData = {
      userId: 'mockedUserId',
      fullName: 'John Doe',
      address1: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      skills: ['JavaScript', 'React'],
      preferences: ['Remote'],
      availability: ['Weekdays'],
    };
    await UserProfile.create(profileData);

    // Act: make a GET request to fetch the profile
    const response = await request(app)
      .get('/api/profiles/me')
      .set('Authorization', `Bearer ${jwt.sign({ id: 'mockedUserId' }, process.env.JWT_SECRET)}`);

    // Assert: check the response
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('fullName', 'John Doe');
  });

  test('should return 404 if the profile is not found', async () => {
    // Act: make a GET request with a non-existent user ID
    const response = await request(app)
      .get('/api/profiles/me')
      .set('Authorization', `Bearer ${jwt.sign({ id: 'nonExistentUserId' }, process.env.JWT_SECRET)}`);

    // Assert: check the response
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'User profile not found');
  });

  test('should return 500 if there is a server error', async () => {
    // Arrange: simulate a server error by mocking `UserProfile.findOne` to throw an error
    jest.spyOn(UserProfile, 'findOne').mockImplementationOnce(() => {
      throw new Error('Mocked server error');
    });

    // Act: make a GET request
    const response = await request(app)
      .get('/api/profiles/me')
      .set('Authorization', `Bearer ${jwt.sign({ id: 'mockedUserId' }, process.env.JWT_SECRET)}`);

    // Assert: check the response
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Mocked server error');
  });
});
