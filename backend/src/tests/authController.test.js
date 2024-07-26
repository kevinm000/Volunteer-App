const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const UserCredentials = require('../models/UserCredentials');
const authController = require('../controllers/authController'); // Adjust path as needed

app.use(express.json());
app.use('/api/auth', require('../routes/auth')); // Ensure this routes to your authController

beforeAll(async () => {
  // Connect to a test database
  await mongoose.connect('mongodb://localhost:27017/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Disconnect from test database
  await mongoose.connection.close();
});

beforeEach(async () => {
  // Clear the database before each test
  await UserCredentials.deleteMany({});
});

describe('Auth Controller', () => {
  test('should register a new user successfully', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
        fullName: 'John Doe',
        address1: '123 Main St',
        address2: '',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
        skills: ['JavaScript'],
        preferences: ['Remote'],
        availability: ['Weekdays'],
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
    expect(response.body.user).toHaveProperty('email', 'test@example.com');
  });

  test('should not register a user with an existing email', async () => {
    await UserCredentials.create({
      email: 'test@example.com',
      password: 'password123',
    });

    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'newpassword',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email already in use');
  });

  test('should log in a user successfully', async () => {
    await UserCredentials.create({
      email: 'test@example.com',
      password: 'password123',
    });

    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body.message).toBe('Login successful');
  });

  test('should not log in with invalid credentials', async () => {
    await UserCredentials.create({
      email: 'test@example.com',
      password: 'password123',
    });

    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'wrongpassword',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid email or password');
  });

  test('should reset users successfully', async () => {
    await UserCredentials.create({ email: 'test@example.com', password: 'password123' });

    await authController.resetUsers([{ email: 'new@example.com', password: 'newpassword' }]);

    const users = await UserCredentials.find();
    expect(users.length).toBe(1);
    expect(users[0].email).toBe('new@example.com');
  });
});
