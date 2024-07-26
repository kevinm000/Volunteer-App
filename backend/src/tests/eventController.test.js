const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const EventDetails = require('../models/EventDetails');
const eventController = require('../controllers/eventController'); // Adjust path as needed

app.use(express.json());
app.use('/api/events', require('../routes/event')); // Ensure this routes to your eventController

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
  await EventDetails.deleteMany({});
});

describe('Event Controller', () => {
  test('should create a new event successfully', async () => {
    const eventData = {
      eventName: 'Beach Cleanup',
      eventDescription: 'Help clean up the beach.',
      location: 'Santa Monica Beach',
      requiredSkills: ['Teamwork'],
      urgency: 'High',
      eventDate: '2023-08-15',
    };

    const response = await request(app)
      .post('/api/events')
      .send(eventData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('eventName', 'Beach Cleanup');
    expect(response.body).toHaveProperty('eventDescription', 'Help clean up the beach.');
  });

  test('should get all events successfully', async () => {
    await EventDetails.create({
      eventName: 'Beach Cleanup',
      eventDescription: 'Help clean up the beach.',
      location: 'Santa Monica Beach',
      requiredSkills: ['Teamwork'],
      urgency: 'High',
      eventDate: '2023-08-15',
    });

    const response = await request(app)
      .get('/api/events');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  test('should get a single event by ID', async () => {
    const event = await EventDetails.create({
      eventName: 'Beach Cleanup',
      eventDescription: 'Help clean up the beach.',
      location: 'Santa Monica Beach',
      requiredSkills: ['Teamwork'],
      urgency: 'High',
      eventDate: '2023-08-15',
    });

    const response = await request(app)
      .get(`/api/events/${event._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('eventName', 'Beach Cleanup');
  });

  test('should return 404 for non-existent event by ID', async () => {
    const response = await request(app)
      .get('/api/events/invalidid');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Event not found');
  });

  test('should update an event by ID', async () => {
    const event = await EventDetails.create({
      eventName: 'Beach Cleanup',
      eventDescription: 'Help clean up the beach.',
      location: 'Santa Monica Beach',
      requiredSkills: ['Teamwork'],
      urgency: 'High',
      eventDate: '2023-08-15',
    });

    const response = await request(app)
      .put(`/api/events/${event._id}`)
      .send({ eventName: 'Updated Event' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('eventName', 'Updated Event');
  });

  test('should return 404 for non-existent event update by ID', async () => {
    const response = await request(app)
      .put('/api/events/invalidid')
      .send({ eventName: 'Updated Event' });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Event not found');
  });

  test('should delete an event by ID', async () => {
    const event = await EventDetails.create({
      eventName: 'Beach Cleanup',
      eventDescription: 'Help clean up the beach.',
      location: 'Santa Monica Beach',
      requiredSkills: ['Teamwork'],
      urgency: 'High',
      eventDate: '2023-08-15',
    });

    const response = await request(app)
      .delete(`/api/events/${event._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Event deleted');

    const checkDeleted = await EventDetails.findById(event._id);
    expect(checkDeleted).toBeNull();
  });

  test('should return 404 for non-existent event delete by ID', async () => {
    const response = await request(app)
      .delete('/api/events/invalidid');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Event not found');
  });
});
