const { 
  matchVolunteers, 
  getMatchedVolunteers, 
  createEvent, 
  getAllEvents, 
  getMatchedProfiles, 
  getEventById, 
  updateEvent, 
  deleteEvent 
} = require('../controllers/volunteermatchController');

const VolunteerMatch = require('../models/VolunteerMatch');
const UserProfile = require('../models/UserProfile');
const EventDetails = require('../models/EventDetails');

jest.mock('../models/VolunteerMatch');
jest.mock('../models/UserProfile');
jest.mock('../models/EventDetails');

describe('volunteermatchController', () => {

  describe('matchVolunteers', () => {
    it('should throw an error if the event is not found', async () => {
      EventDetails.findById.mockResolvedValue(null);

      await expect(matchVolunteers('nonExistentId')).rejects.toThrow('Event not found');
    });

    it('should return matched volunteers based on skills and availability', async () => {
      const mockEvent = {
        requiredSkills: ['skill1', 'skill2'],
        eventDate: new Date('2023-08-09')
      };
      const mockVolunteers = [
        {
          skills: ['skill1', 'skill2'],
          availability: [new Date('2023-08-09')]
        },
        {
          skills: ['skill1'],
          availability: [new Date('2023-08-09')]
        },
        {
          skills: ['skill1', 'skill2'],
          availability: [new Date('2023-08-10')]
        }
      ];

      EventDetails.findById.mockResolvedValue(mockEvent);
      UserProfile.find.mockResolvedValue(mockVolunteers);

      const result = await matchVolunteers('eventId');
      expect(result).toEqual([mockVolunteers[0]]);
    });
  });

  describe('getMatchedVolunteers', () => {
    it('should return matched volunteers for a valid event ID', async () => {
      const req = { params: { eventId: 'eventId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const mockMatchedVolunteers = [{ volunteer: 'volunteer1' }];
      matchVolunteers.mockResolvedValue(mockMatchedVolunteers);

      await getMatchedVolunteers(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockMatchedVolunteers);
    });

    it('should return an error if matching fails', async () => {
      const req = { params: { eventId: 'eventId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      matchVolunteers.mockRejectedValue(new Error('Matching failed'));

      await getMatchedVolunteers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Failed to match volunteers', error: 'Matching failed' });
    });
  });

  describe('createEvent', () => {
    it('should create a new event', async () => {
      const req = { body: { eventName: 'Event', eventDescription: 'Description', location: 'Location', requiredSkills: ['skill1'], urgency: 'high', eventDate: new Date('2023-08-09') } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const mockEvent = { save: jest.fn() };
      VolunteerMatch.mockImplementation(() => mockEvent);

      await createEvent(req, res);

      expect(mockEvent.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockEvent);
    });

    it('should return an error if event creation fails', async () => {
      const req = { body: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      VolunteerMatch.mockImplementation(() => {
        throw new Error('Validation failed');
      });

      await createEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Validation failed' });
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

    it('should return an error if fetching events fails', async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      EventDetails.find.mockRejectedValue(new Error('Fetching failed'));

      await getAllEvents(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Fetching failed' });
    });
  });

  describe('getMatchedProfiles', () => {
    it('should return all matched profiles', async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const mockMatchedProfiles = [{ profile: 'profile1' }];
      VolunteerMatch.find.mockResolvedValue({ populate: jest.fn().mockResolvedValue(mockMatchedProfiles) });

      await getMatchedProfiles(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockMatchedProfiles);
    });

    it('should return an error if fetching matched profiles fails', async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      VolunteerMatch.find.mockResolvedValue({ populate: jest.fn().mockRejectedValue(new Error('Fetching failed')) });

      await getMatchedProfiles(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Fetching failed' });
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

    it('should return an error if event not found', async () => {
      const req = { params: { id: 'eventId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      EventDetails.findById.mockResolvedValue(null);

      await getEventById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Event not found' });
    });

    it('should return an error if fetching event fails', async () => {
      const req = { params: { id: 'eventId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      EventDetails.findById.mockRejectedValue(new Error('Fetching failed'));

      await getEventById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Fetching failed' });
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
      expect(res.json).toHaveBeenCalledWith(mockUpdatedEvent);
    });

    it('should return an error if event not found for update', async () => {
      const req = { params: { id: 'eventId' }, body: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      EventDetails.findByIdAndUpdate.mockResolvedValue(null);

      await updateEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Event not found' });
    });

    it('should return an error if updating event fails', async () => {
      const req = { params: { id: 'eventId' }, body: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      EventDetails.findByIdAndUpdate.mockRejectedValue(new Error('Updating failed'));

      await updateEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Updating failed' });
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
      expect(res.json).toHaveBeenCalledWith({ message: 'Event deleted' });
    });

    it('should return an error if event not found for deletion', async () => {
      const req = { params: { id: 'eventId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      EventDetails.findByIdAndDelete.mockResolvedValue(null);

      await deleteEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Event not found' });
    });

    it('should return an error if deleting event fails', async () => {
      const req = { params: { id: 'eventId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      EventDetails.findByIdAndDelete.mockRejectedValue(new Error('Deleting failed'));

      await deleteEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Deleting failed' });
    });
  });

});
