const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const eventRouter = require('../routes/event');
const { resetEvents } = require('../controllers/eventController');

const app = express();
app.use(bodyParser.json());
app.use('/api/events', eventRouter);

// Helper function to reset the events array
const initialEvents = [
  {
    id: 1,
    eventName: 'Beach Cleanup',
    eventDescription: 'Join us for a beach cleanup event to help keep our beaches clean and beautiful.',
    location: 'Santa Monica Beach, CA',
    requiredSkills: ['Teamwork', 'Time Management'],
    urgency: 'High',
    eventDate: '2023-08-15',
  },
  {
    id: 2,
    eventName: 'Community Garden Planting',
    eventDescription: 'Help us plant a new community garden and learn about sustainable gardening practices.',
    location: 'Downtown Community Center, NY',
    requiredSkills: ['Gardening', 'Teamwork', 'Creativity'],
    urgency: 'Medium',
    eventDate: '2023-09-20',
  },
  {
    id: 3,
    eventName: 'Food Drive',
    eventDescription: 'Participate in our food drive to collect and distribute food to those in need.',
    location: 'Local Food Bank, TX',
    requiredSkills: ['Communication', 'Empathy'],
    urgency: 'Low',
    eventDate: '2023-10-10',
  },
];

describe('Event Controller', () => {
  beforeEach(() => {
    resetEvents(initialEvents); // Reset events before each test
  });

  it('should get all events', async () => {
    const response = await request(app).get('/api/events');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(3); // Based on your initial events array
  });

  it('should get an event by ID', async () => {
    const response = await request(app).get('/api/events/1');
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
    expect(response.body.eventName).toBe('Beach Cleanup');
  });

  it('should return 404 for non-existing event ID', async () => {
    const response = await request(app).get('/api/events/999');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Event not found');
  });

  it('should create a new event', async () => {
    const newEvent = {
      eventName: 'Test Event',
      eventDescription: 'Test event description',
      location: 'Test Location',
      requiredSkills: ['Test Skill'],
      urgency: 'High',
      eventDate: '2023-12-31',
    };
    const response = await request(app)
      .post('/api/events')
      .send(newEvent);
    expect(response.status).toBe(201);
    expect(response.body.eventName).toBe(newEvent.eventName);
  });

  it('should update an existing event', async () => {
    const updatedEvent = {
      eventName: 'Updated Event',
      eventDescription: 'Updated event description',
      location: 'Updated Location',
      requiredSkills: ['Updated Skill'],
      urgency: 'Medium',
      eventDate: '2024-01-01',
    };
    const response = await request(app)
      .put('/api/events/1')
      .send(updatedEvent);
    expect(response.status).toBe(200);
    expect(response.body.eventName).toBe(updatedEvent.eventName);
  });

  it('should return 404 for updating non-existing event', async () => {
    const updatedEvent = {
      eventName: 'Non-existing Event',
      eventDescription: 'Non-existing event description',
      location: 'Non-existing Location',
      requiredSkills: ['Non-existing Skill'],
      urgency: 'Low',
      eventDate: '2024-01-01',
    };
    const response = await request(app)
      .put('/api/events/999')
      .send(updatedEvent);
    expect(response.status).toBe(404);
    expect(response.text).toBe('Event not found');
  });
/*
  it('should delete an event', async () => {
    const response = await request(app).delete('/api/events/1');
    expect(response.status).toBe(200);
    expect(response.body.eventName).toBe('Beach Cleanup');
  }); 

  it('should return 404 for deleting non-existing event', async () => {
    const response = await request(app).delete('/api/events/999');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Event not found');
  }); */
});
