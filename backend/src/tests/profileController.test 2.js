const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const profileRouter = require('../routes/profile');
const profileController = require('../controllers/profileController');

const app = express();
app.use(bodyParser.json());
app.use('/api/profiles', profileRouter);

// Helper function to reset the profiles array
const initialProfiles = [
  {
    id: 1,
    fullName: 'John Doe',
    address1: '123 Main St',
    address2: 'Apt 4B',
    city: 'Anytown',
    state: 'CA',
    zipCode: '90210',
    skills: ['Communication', 'Teamwork'],
    preferences: 'Prefers outdoor activities',
    availability: ['2023-08-15', '2023-09-20'],
  },
  {
    id: 2,
    fullName: 'Jane Smith',
    address1: '456 Elm St',
    address2: '',
    city: 'Othertown',
    state: 'NY',
    zipCode: '10001',
    skills: ['Leadership', 'Time Management'],
    preferences: 'Likes working with children',
    availability: ['2023-10-10', '2023-11-15'],
  },
  {
    id: 3,
    fullName: 'Alice Johnson',
    address1: '789 Maple Ave',
    address2: 'Suite 5C',
    city: 'Somecity',
    state: 'TX',
    zipCode: '73301',
    skills: ['Problem Solving', 'Creativity'],
    preferences: 'Enjoys community outreach programs',
    availability: ['2023-12-01', '2023-12-15'],
  },
];

const resetProfiles = () => {
  profileController.resetProfiles([...initialProfiles]);
};

describe('Profile Controller', () => {
  beforeEach(() => {
    resetProfiles();
  });

  it('should get all profiles', async () => {
    const response = await request(app).get('/api/profiles');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(3); // Based on your initial profiles array
  });

  it('should get a profile by ID', async () => {
    const response = await request(app).get('/api/profiles/1');
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
    expect(response.body.fullName).toBe('John Doe');
  });

  it('should return 404 for non-existing profile ID', async () => {
    const response = await request(app).get('/api/profiles/999');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Profile not found');
  });

  it('should create a new profile', async () => {
    const newProfile = {
      fullName: 'Test User',
      address1: '123 Test St',
      address2: '',
      city: 'Test City',
      state: 'TS',
      zipCode: '12345',
      skills: ['Test Skill'],
      preferences: 'Test preferences',
      availability: ['2023-12-31'],
    };
    const response = await request(app)
      .post('/api/profiles')
      .send(newProfile);
    expect(response.status).toBe(201);
    expect(response.body.fullName).toBe(newProfile.fullName);
  });

  it('should update an existing profile', async () => {
    const updatedProfile = {
      fullName: 'Updated User',
      address1: '123 Updated St',
      address2: 'Apt 1A',
      city: 'Updated City',
      state: 'UT',
      zipCode: '54321',
      skills: ['Updated Skill'],
      preferences: 'Updated preferences',
      availability: ['2024-01-01'],
    };
    const response = await request(app)
      .put('/api/profiles/1')
      .send(updatedProfile);
    expect(response.status).toBe(200);
    expect(response.body.fullName).toBe(updatedProfile.fullName);
  });

  it('should return 404 for updating non-existing profile', async () => {
    const updatedProfile = {
      fullName: 'Non-existing User',
      address1: '123 Non-existing St',
      address2: '',
      city: 'Non-existing City',
      state: 'NE',
      zipCode: '00000',
      skills: ['Non-existing Skill'],
      preferences: 'Non-existing preferences',
      availability: ['2025-01-01'],
    };
    const response = await request(app)
      .put('/api/profiles/999')
      .send(updatedProfile);
    expect(response.status).toBe(404);
    expect(response.text).toBe('Profile not found');
  });

  it('should delete a profile', async () => {
    const response = await request(app).delete('/api/profiles/1');
    expect(response.status).toBe(200);
    expect(response.body.fullName).toBe('John Doe');
  });

  it('should return 404 for deleting non-existing profile', async () => {
    const response = await request(app).delete('/api/profiles/999');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Profile not found');
  });
});
