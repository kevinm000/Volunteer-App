const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('../routes/auth');
const { resetUsers } = require('../controllers/authController');

const app = express();
app.use(bodyParser.json());
app.use('/api/auth', authRouter);

// Helper function to reset the users array
const initialUsers = [
  { email: 'test@example.com', password: 'password123' }
];

describe('Auth Controller', () => {
  beforeEach(() => {
    const authController = require('../controllers/authController');
    authController.resetUsers([...initialUsers]);
  });

  it('should login with valid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login successful');
    expect(response.body.user.email).toBe('test@example.com');
  });

  it('should not login with invalid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'wrongpassword' });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid credentials');
  });

  it('should register a new user', async () => {
    const newUser = {
      email: 'newuser@example.com',
      password: 'newpassword123',
      fullName: 'New User',
      address1: '123 New St',
      address2: '',
      city: 'New City',
      state: 'NC',
      zipCode: '12345',
      skills: ['New Skill'],
      preferences: 'New preferences',
      availability: ['2023-12-31'],
    };
    const response = await request(app)
      .post('/api/auth/register')
      .send(newUser);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
    expect(response.body.user.email).toBe(newUser.email);
  });

  it('should not register a user with an existing email', async () => {
    const existingUser = {
      email: 'test@example.com',
      password: 'newpassword123',
      fullName: 'Existing User',
      address1: '123 Existing St',
      address2: '',
      city: 'Existing City',
      state: 'EX',
      zipCode: '54321',
      skills: ['Existing Skill'],
      preferences: 'Existing preferences',
      availability: ['2023-12-31'],
    };
    const response = await request(app)
      .post('/api/auth/register')
      .send(existingUser);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email already in use');
  });
});
