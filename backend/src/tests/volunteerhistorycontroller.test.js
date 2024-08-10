const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const VolunteerHistory = require('../models/VolunteerHistory');
const EventDetails = require('../models/EventDetails');
const UserProfile = require('../models/UserProfile');
const { createRecord, getAllRecords, getRecordsByVolunteerId, getRecordsByEventId, updateRecord, deleteRecord } = require('../controllers/volunteerHistoryController');

const app = express();
app.use(express.json());
app.post('/api/volunteer-history', createRecord);
app.get('/api/volunteer-history', getAllRecords);
app.get('/api/volunteer-history/volunteer', getRecordsByVolunteerId);
app.get('/api/volunteer-history/event/:id', getRecordsByEventId);
app.put('/api/volunteer-history/:id', updateRecord);
app.delete('/api/volunteer-history/:id', deleteRecord);

jest.mock('../models/VolunteerHistory');
jest.mock('../models/EventDetails');
jest.mock('../models/UserProfile');

describe('VolunteerHistory Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createRecord', () => {
    it('should create a new record successfully', async () => {
      const mockEvent = { _id: 'event123', eventName: 'Beach Cleanup' };
      EventDetails.findById.mockResolvedValue(mockEvent);

      VolunteerHistory.prototype.save = jest.fn().mockResolvedValue({
        volunteerId: 'volunteer123',
        eventId: 'event123',
        participationStatus: 'Attended',
      });

      const response = await request(app)
        .post('/api/volunteer-history')
        .send({
          volunteerId: 'volunteer123',
          eventId: 'event123',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('participationStatus', 'Attended');
    });

    it('should return 400 if eventId or volunteerId is missing', async () => {
      const response = await request(app).post('/api/volunteer-history').send({});
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Event ID and Volunteer ID are required');
    });

    it('should return 404 if event is not found', async () => {
      EventDetails.findById.mockResolvedValue(null);

      const response = await request(app)
        .post('/api/volunteer-history')
        .send({
          volunteerId: 'volunteer123',
          eventId: 'event123',
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Event not found');
    });

    it('should return 500 if there is a server error', async () => {
      EventDetails.findById.mockRejectedValue(new Error('Server error'));

      const response = await request(app)
        .post('/api/volunteer-history')
        .send({
          volunteerId: 'volunteer123',
          eventId: 'event123',
        });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Server error');
    });
  });

  describe('getAllRecords', () => {
    it('should return all volunteer history records', async () => {
      const mockRecords = [{ _id: 'record123', volunteerId: { fullName: 'John Doe' }, eventId: { eventName: 'Beach Cleanup' } }];
      VolunteerHistory.find.mockResolvedValue(mockRecords);

      const response = await request(app).get('/api/volunteer-history');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return 500 if there is a server error', async () => {
      VolunteerHistory.find.mockRejectedValue(new Error('Server error'));

      const response = await request(app).get('/api/volunteer-history');

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Server error');
    });
  });

  describe('getRecordsByVolunteerId', () => {
    it('should return volunteer history records by volunteer ID', async () => {
      const mockRecords = [{ _id: 'record123', eventId: { eventName: 'Beach Cleanup' } }];
      VolunteerHistory.find.mockResolvedValue(mockRecords);

      const response = await request(app)
        .get('/api/volunteer-history/volunteer')
        .send({ volunteerId: 'volunteer123' });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return 404 if no records found', async () => {
      VolunteerHistory.find.mockResolvedValue([]);

      const response = await request(app)
        .get('/api/volunteer-history/volunteer')
        .send({ volunteerId: 'volunteer123' });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('No records found for this volunteer');
    });

    it('should return 500 if there is a server error', async () => {
      VolunteerHistory.find.mockRejectedValue(new Error('Server error'));

      const response = await request(app)
        .get('/api/volunteer-history/volunteer')
        .send({ volunteerId: 'volunteer123' });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Server error');
    });
  });

  describe('getRecordsByEventId', () => {
    it('should return volunteer history records by event ID', async () => {
      const mockRecords = [{ _id: 'record123', volunteerId: { fullName: 'John Doe' } }];
      VolunteerHistory.find.mockResolvedValue(mockRecords);

      const response = await request(app).get('/api/volunteer-history/event/event123');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return 400 if event ID is invalid', async () => {
      const response = await request(app).get('/api/volunteer-history/event/invalidID');
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid event ID format');
    });

    it('should return 404 if no records found for event', async () => {
      VolunteerHistory.find.mockResolvedValue([]);

      const response = await request(app).get('/api/volunteer-history/event/event123');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('No records found for this event');
    });

    it('should return 500 if there is a server error', async () => {
      VolunteerHistory.find.mockRejectedValue(new Error('Server error'));

      const response = await request(app).get('/api/volunteer-history/event/event123');

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Server error');
    });
  });

  describe('updateRecord', () => {
    it('should update a volunteer history record successfully', async () => {
      const mockRecord = { _id: 'record123', participationStatus: 'Attended' };
      VolunteerHistory.findByIdAndUpdate.mockResolvedValue(mockRecord);

      const response = await request(app)
        .put('/api/volunteer-history/record123')
        .send({ participationStatus: 'Attended' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('participationStatus', 'Attended');
    });

    it('should return 404 if record not found', async () => {
      VolunteerHistory.findByIdAndUpdate.mockResolvedValue(null);

      const response = await request(app)
        .put('/api/volunteer-history/record123')
        .send({ participationStatus: 'Attended' });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Record not found');
    });

    it('should return 400 if there is a server error', async () => {
      VolunteerHistory.findByIdAndUpdate.mockRejectedValue(new Error('Server error'));

      const response = await request(app)
        .put('/api/volunteer-history/record123')
        .send({ participationStatus: 'Attended' });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Server error');
    });
  });

  describe('deleteRecord', () => {
    it('should delete a volunteer history record successfully', async () => {
      VolunteerHistory.findByIdAndDelete.mockResolvedValue({ _id: 'record123' });

      const response = await request(app).delete('/api/volunteer-history/record123');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Record deleted');
    });

    it('should return 404 if record not found', async () => {
      VolunteerHistory.findByIdAndDelete.mockResolvedValue(null);

      const response = await request(app).delete('/api/volunteer-history/record123');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Record not found');
    });

    it('should return 500 if there is a server error', async () => {
      VolunteerHistory.findByIdAndDelete.mockRejectedValue(new Error('Server error'));

      const response = await request(app).delete('/api/volunteer-history/record123');

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Server error');
    });
  });
});
