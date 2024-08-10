const { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } = require('../controllers/eventController');
const EventDetails = require('../models/EventDetails');
const UserProfile = require('../models/UserProfile');
const { validationResult } = require('express-validator');
const { sendNotification } = require('../controllers/notiController');

jest.mock('../models/EventDetails');
jest.mock('../models/UserProfile');
jest.mock('../controllers/notiController');
jest.mock('express-validator', () => ({
  validationResult: jest.fn()
}));

describe('eventController', () => {

  describe('createEvent', () => {
    it('should return 400 if validation errors exist', async () => {
      validationResult.mockReturnValue({ isEmpty: () => false, array: () => [{ msg: 'Invalid data' }] });

      const req = { body: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await createEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ errors: [{ msg: 'Invalid data' }] });
    });

    it('should create an event and notify volunteers', async () => {
      validationResult.mockReturnValue({ isEmpty: () => true });

      const req = { body: { eventName: 'Event1', eventDescription: 'Desc', location: 'Location', requiredSkills: ['Skill1'], urgency: 'High', eventDate: new Date() } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const mockEvent = { save: jest.fn(), eventName: 'Event1' };
      EventDetails.mockImplementation(() => mockEvent);

      const mockVolunteers = [{ userId: 'vol1' }, { userId: 'vol2' }];
      UserProfile.find.mockResolvedValue(mockVolunteers);

      await createEvent(req, res);

      expect(mockEvent.save).toHaveBeenCalled();
      expect(sendNotification).toHaveBeenCalledTimes(mockVolunteers.length);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Event created successfully', event: mockEvent });
    });

    it('should handle server error when creating an event', async () => {
      validationResult.mockReturnValue({ isEmpty: () => true });

      const req = { body: { eventName: 'Event1' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      EventDetails.mockImplementation(() => { throw new Error('Server error'); });

      await createEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Server error', error: 'Server error' });
    });
  });

  describe('getAllEvents', () => {
    it('should return all events', async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const mockEvents = [{ eventName: 'Event1' }, { eventName: 'Event2' }];
      EventDetails.find.mockResolvedValue(mockEvents);

      await getAllEvents(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockEvents);
    });

    it('should handle server error when fetching all events', async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      EventDetails.find.mockRejectedValue(new Error('Server error'));

      await getAllEvents(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Server error', error: 'Server error' });
    });
  });

  describe('getEventById', () => {
    it('should return an event by ID', async () => {
      const req = { params: { id: 'eventId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const mockEvent = { eventName: 'Event1' };
      EventDetails.findById.mockResolvedValue(mockEvent);

      await getEventById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockEvent);
    });

    it('should return 404 if event not found', async () => {
      const req = { params: { id: 'eventId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      EventDetails.findById.mockResolvedValue(null);

      await getEventById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Event not found' });
    });

    it('should handle server error when fetching event by ID', async () => {
      const req = { params: { id: 'eventId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      EventDetails.findById.mockRejectedValue(new Error('Server error'));

      await getEventById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Server error', error: 'Server error' });
    });
  });

  describe('updateEvent', () => {
    it('should update an event by ID', async () => {
      const req = { params: { id: 'eventId' }, body: { eventName: 'Updated Event' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const mockUpdatedEvent = { eventName: 'Updated Event' };
      EventDetails.findByIdAndUpdate.mockResolvedValue(mockUpdatedEvent);

      await updateEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Event updated successfully', updatedEvent: mockUpdatedEvent });
    });

    it('should return 404 if event not found for update', async () => {
      const req = { params: { id: 'eventId' }, body: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      EventDetails.findByIdAndUpdate.mockResolvedValue(null);

      await updateEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Event not found' });
    });

    it('should handle server error when updating event', async () => {
      const req = { params: { id: 'eventId' }, body: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      EventDetails.findByIdAndUpdate.mockRejectedValue(new Error('Server error'));

      await updateEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Bad request', error: 'Server error' });
    });
  });

  describe('deleteEvent', () => {
    it('should delete an event by ID', async () => {
      const req = { params: { id: 'eventId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const mockDeletedEvent = { eventName: 'Deleted Event' };
      EventDetails.findByIdAndDelete.mockResolvedValue(mockDeletedEvent);

      await deleteEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Event deleted successfully' });
    });

    it('should return 404 if event not found for deletion', async () => {
      const req = { params: { id: 'eventId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      EventDetails.findByIdAndDelete.mockResolvedValue(null);

      await deleteEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Event not found' });
    });

    it('should handle server error when deleting event', async () => {
      const req = { params: { id: 'eventId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      EventDetails.findByIdAndDelete.mockRejectedValue(new Error('Server error'));

      await deleteEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Server error', error: 'Server error' });
    });
  });

});
