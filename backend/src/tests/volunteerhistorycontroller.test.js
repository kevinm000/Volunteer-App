const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const VolunteerHistory = require('../models/VolunteerHistory');
const volunteerhistoryController = require('../controllers/volunteerhistoryController');

app.use(express.json());
app.use('/api/volunteerhistory', require('../routes/volunteerhistoryRoutes'));

// Mock data
const mockRecord = {
  volunteerId: 'volunteer1',
  eventId: 'event1',
  participationStatus: 'Completed',
  feedback: 'Great event!'
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

describe('Volunteer History Controller', () => {
  it('should create a new volunteer history record', async () => {
    const response = await request(app)
      .post('/api/volunteerhistory/create')
      .send(mockRecord);
    
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(mockRecord);
  });

  it('should get all volunteer history records', async () => {
    await request(app)
      .post('/api/volunteerhistory/create')
      .send(mockRecord);

    const response = await request(app).get('/api/volunteerhistory/');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('should get volunteer history by volunteer ID', async () => {
    await request(app)
      .post('/api/volunteerhistory/create')
      .send(mockRecord);

    const response = await request(app).get('/api/volunteerhistory/volunteer/volunteer1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('should get volunteer history by event ID', async () => {
    await request(app)
      .post('/api/volunteerhistory/create')
      .send(mockRecord);

    const response = await request(app).get('/api/volunteerhistory/event/event1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('should update a volunteer history record', async () => {
    const newRecord = await request(app)
      .post('/api/volunteerhistory/create')
      .send(mockRecord);
    
    const updatedRecord = {
      ...mockRecord,
      feedback: 'Updated feedback!'
    };

    const response = await request(app)
      .put(`/api/volunteerhistory/${newRecord.body._id}`)
      .send(updatedRecord);
    
    expect(response.status).toBe(200);
    expect(response.body.feedback).toBe('Updated feedback!');
  });

  it('should delete a volunteer history record', async () => {
    const newRecord = await request(app)
      .post('/api/volunteerhistory/create')
      .send(mockRecord);
    
    const response = await request(app)
      .delete(`/api/volunteerhistory/${newRecord.body._id}`);
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Record deleted');
  });
});
