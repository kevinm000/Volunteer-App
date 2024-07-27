// src/tests/eventController.test.js
const request = require('supertest');
const app = require('../../server'); // Adjust the path to your server file
const mongoose = require('mongoose');
const EventDetails = require('../models/EventDetails');

describe('Event Controller', () => {
  let server;
  
  beforeAll(async () => {
    server = app.listen(4000); // Ensure the server runs on a different port for testing
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    server.close();
  });

  const eventData = {
    eventName: 'Beach Cleanup',
    eventDescription: 'Help clean up the beach.',
    location: 'Santa Monica Beach',
    requiredSkills: ['Teamwork'],
    urgency: 'High',
    eventDate: '2023-08-15',
  };

  test('should create a new event successfully', async () => {
    const response = await request(app).post('/api/events').send(eventData);
    expect(response.status).toBe(201);
    expect(response.body.event).toHaveProperty('eventName', 'Beach Cleanup');
  });

  test('should return 400 if validation fails', async () => {
    const response = await request(app).post('/api/events').send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });

  test('should get all events', async () => {
    const response = await request(app).get('/api/events');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('should get an event by ID', async () => {
    const eventResponse = await request(app).post('/api/events').send(eventData);
    const eventId = eventResponse.body.event._id;
    const response = await request(app).get(`/api/events/${eventId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('eventName', 'Beach Cleanup');
  });

  test('should return 404 for non-existent event by ID', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const response = await request(app).get(`/api/events/${nonExistentId}`);
    expect(response.status).toBe(404);
  });

  test('should update an event by ID', async () => {
    const eventResponse = await request(app).post('/api/events').send(eventData);
    const eventId = eventResponse.body.event._id;
    const updateData = { eventName: 'Updated Event' };

    const response = await request(app).put(`/api/events/${eventId}`).send(updateData);
    expect(response.status).toBe(200);
    expect(response.body.updatedEvent).toHaveProperty('eventName', 'Updated Event');
  });

  test('should return 404 for non-existent event update by ID', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const response = await request(app).put(`/api/events/${nonExistentId}`).send({ eventName: 'Updated Event' });
    expect(response.status).toBe(404);
  });

  test('should delete an event by ID', async () => {
    const eventResponse = await request(app).post('/api/events').send(eventData);
    const eventId = eventResponse.body.event._id;

    const response = await request(app).delete(`/api/events/${eventId}`);
    expect(response.status).toBe(200);
  });

  test('should return 404 for non-existent event delete by ID', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const response = await request(app).delete(`/api/events/${nonExistentId}`);
    expect(response.status).toBe(404);
  });

  test('should return 500 for server errors during creation', async () => {
    jest.spyOn(EventDetails.prototype, 'save').mockImplementationOnce(() => {
      throw new Error('Mocked error');
    });
    const response = await request(app).post('/api/events').send(eventData);
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Server error');
  });

  test('should return 500 for server errors during fetching all events', async () => {
    jest.spyOn(EventDetails, 'find').mockImplementationOnce(() => {
      throw new Error('Mocked error');
    });
    const response = await request(app).get('/api/events');
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Server error');
  });

  test('should return 500 for server errors during fetching event by ID', async () => {
    jest.spyOn(EventDetails, 'findById').mockImplementationOnce(() => {
      throw new Error('Mocked error');
    });
    const nonExistentId = new mongoose.Types.ObjectId();
    const response = await request(app).get(`/api/events/${nonExistentId}`);
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Server error');
  });

  test('should return 500 for server errors during updating event', async () => {
    jest.spyOn(EventDetails, 'findByIdAndUpdate').mockImplementationOnce(() => {
      throw new Error('Mocked error');
    });
    const eventResponse = await request(app).post('/api/events').send(eventData);
    const eventId = eventResponse.body.event._id;
    const response = await request(app).put(`/api/events/${eventId}`).send({ eventName: 'Updated Event' });
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Server error');
  });

  test('should return 500 for server errors during deleting event', async () => {
    jest.spyOn(EventDetails, 'findByIdAndDelete').mockImplementationOnce(() => {
      throw new Error('Mocked error');
    });
    const eventResponse = await request(app).post('/api/events').send(eventData);
    const eventId = eventResponse.body.event._id;
    const response = await request(app).delete(`/api/events/${eventId}`);
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Server error');
  });
});
