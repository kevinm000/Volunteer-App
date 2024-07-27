const request = require('supertest');
const app = require('./setup');
const mongoose = require('mongoose');
const VolunteerHistory = require('../models/VolunteerHistory');

describe('Volunteer History Controller', () => {
  const recordData = {
    volunteerId: new mongoose.Types.ObjectId(),
    eventId: new mongoose.Types.ObjectId(),
    participationStatus: 'Attended',
    feedback: 'Great event',
  };

  let recordId;

  beforeAll(async () => {
    // Clear and seed the database before running tests
    await VolunteerHistory.deleteMany({});
    const record = new VolunteerHistory(recordData);
    await record.save();
    recordId = record._id.toString();
  });

  afterEach(async () => {
    jest.restoreAllMocks();
  });

  test('should create a new volunteer history record successfully', async () => {
    const response = await request(app).post('/api/volunteerhistory').send(recordData);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('participationStatus', 'Attended');
  });

  test('should return 500 if record creation fails', async () => {
    jest.spyOn(VolunteerHistory.prototype, 'save').mockImplementationOnce(() => {
      throw new Error('Mocked error');
    });
    const response = await request(app).post('/api/volunteerhistory').send(recordData);
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Mocked error');
  });

  test('should get all volunteer history records', async () => {
    const response = await request(app).get('/api/volunteerhistory');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('should return 500 if fetching all records fails', async () => {
    jest.spyOn(VolunteerHistory, 'find').mockImplementationOnce(() => {
      throw new Error('Mocked error');
    });
    const response = await request(app).get('/api/volunteerhistory');
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Mocked error');
  });

  test('should get records by volunteer ID', async () => {
    const response = await request(app).get(`/api/volunteerhistory/volunteer/${recordData.volunteerId}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('should return 404 if no records found for volunteer ID', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const response = await request(app).get(`/api/volunteerhistory/volunteer/${nonExistentId}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'No records found for this volunteer');
  });

  test('should return 500 if fetching records by volunteer ID fails', async () => {
    jest.spyOn(VolunteerHistory, 'find').mockImplementationOnce(() => {
      throw new Error('Mocked error');
    });
    const nonExistentId = new mongoose.Types.ObjectId();
    const response = await request(app).get(`/api/volunteerhistory/volunteer/${nonExistentId}`);
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Mocked error');
  });

  test('should get records by event ID', async () => {
    const response = await request(app).get(`/api/volunteerhistory/event/${recordData.eventId}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('should return 404 if no records found for event ID', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const response = await request(app).get(`/api/volunteerhistory/event/${nonExistentId}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'No records found for this event');
  });

  test('should return 500 if fetching records by event ID fails', async () => {
    jest.spyOn(VolunteerHistory, 'find').mockImplementationOnce(() => {
      throw new Error('Mocked error');
    });
    const nonExistentId = new mongoose.Types.ObjectId();
    const response = await request(app).get(`/api/volunteerhistory/event/${nonExistentId}`);
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Mocked error');
  });

  test('should update a volunteer history record by ID', async () => {
    const updateData = { feedback: 'Updated feedback' };
    const response = await request(app).put(`/api/volunteerhistory/${recordId}`).send(updateData);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('feedback', 'Updated feedback');
  });

  test('should return 404 if updating non-existent record', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const response = await request(app).put(`/api/volunteerhistory/${nonExistentId}`).send({ feedback: 'Updated feedback' });
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Record not found');
  });

  test('should return 400 if updating record fails', async () => {
    jest.spyOn(VolunteerHistory, 'findByIdAndUpdate').mockImplementationOnce(() => {
      throw new Error('Mocked error');
    });
    const response = await request(app).put(`/api/volunteerhistory/${recordId}`).send({ feedback: 'Updated feedback' });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Mocked error');
  });

  test('should delete a volunteer history record by ID', async () => {
    const response = await request(app).delete(`/api/volunteerhistory/${recordId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Record deleted');
  });

  test('should return 404 if deleting non-existent record', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const response = await request(app).delete(`/api/volunteerhistory/${nonExistentId}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Record not found');
  });

  test('should return 500 if deleting record fails', async () => {
    jest.spyOn(VolunteerHistory, 'findByIdAndDelete').mockImplementationOnce(() => {
      throw new Error('Mocked error');
    });
    const nonExistentId = new mongoose.Types.ObjectId();
    const response = await request(app).delete(`/api/volunteerhistory/${nonExistentId}`);
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Mocked error');
  });
});
