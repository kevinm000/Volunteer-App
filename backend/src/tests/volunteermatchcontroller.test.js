const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const VolunteerMatch = require('../models/VolunteerMatch');
const volunteermatchRoutes = require('../routes/volunteermatchRoutes');

app.use(express.json());
app.use('/api/volunteermatch', volunteermatchRoutes);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Volunteer Match Controller', () => {
  it('should create a new event', async () => {
    const newEvent = {
      eventName: 'Clean-Up Drive',
      eventDescription: 'Community clean-up drive',
      location: 'Central Park',
      requiredSkills: ['Cleaning', 'Organization'],
      urgency: 'High',
      eventDate: '2024-08-15T10:00:00Z'
    };

    const response = await request(app)
      .post('/api/volunteermatch')
      .send(newEvent);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newEvent);
  });

  it('should get a single event by ID', async () => {
    const newEvent = await request(app)
      .post('/api/volunteermatch')
      .send({
        eventName: 'Food Drive',
        eventDescription: 'Community food drive',
        location: 'Downtown Hall',
        requiredSkills: ['Packing', 'Distribution'],
        urgency: 'Medium',
        eventDate: '2024-08-20T10:00:00Z'
      });

    const response = await request(app)
      .get(`/api/volunteermatch/${newEvent.body._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(newEvent.body);
  });

  it('should update an event by ID', async () => {
    const newEvent = await request(app)
      .post('/api/volunteermatch')
      .send({
        eventName: 'Beach Cleanup',
        eventDescription: 'Beach cleanup event',
        location: 'Sunny Beach',
        requiredSkills: ['Cleanup'],
        urgency: 'Low',
        eventDate: '2024-08-25T10:00:00Z'
      });

    const updatedEvent = {
      eventName: 'Beach Cleanup Updated',
      eventDescription: 'Updated beach cleanup event',
      location: 'Sunny Beach',
      requiredSkills: ['Cleanup'],
      urgency: 'Medium',
      eventDate: '2024-08-26T10:00:00Z'
    };

    const response = await request(app)
      .put(`/api/volunteermatch/${newEvent.body._id}`)
      .send(updatedEvent);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedEvent);
  });

  it('should delete an event by ID', async () => {
    const newEvent = await request(app)
      .post('/api/volunteermatch')
      .send({
        eventName: 'Charity Run',
        eventDescription: 'Charity run event',
        location: 'City Center',
        requiredSkills: ['Running', 'Cheering'],
        urgency: 'High',
        eventDate: '2024-08-30T10:00:00Z'
      });

    const response = await request(app)
      .delete(`/api/volunteermatch/${newEvent.body._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Event deleted');
  });

  it('should get all matched profiles', async () => {
    const response = await request(app)
      .get('/api/volunteermatch');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

