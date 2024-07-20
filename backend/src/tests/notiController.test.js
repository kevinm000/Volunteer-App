const { sendNotification, getNotifications, deleteNotification } = require('../controllers/notiController');

let notifications = [];

beforeEach(() => {
  // Reset notifications array before each test
  notifications = [
    { id: 1, volunteerId: 1, message: 'Test notification', isNew: true, date: new Date() }
  ];
});

describe('Notification Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      params: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
  });

  describe('sendNotification', () => {
    it('should send a new notification', () => {
      req.body = {
        volunteerId: 1,
        message: 'You have been assigned a new event.'
      };

      sendNotification(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          volunteerId: 1,
          message: 'You have been assigned a new event.'
        })
      );
    });
  });

  describe('getNotifications', () => {
    it('should retrieve all notifications', () => {
      getNotifications(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(Array.isArray(res.json.mock.calls[0][0])).toBe(true);
      expect(res.json.mock.calls[0][0].length).toBeGreaterThan(0);
    });
  });

  describe('deleteNotification', () => {
    it('should delete a notification', () => {
      req.params.id = 1;

      deleteNotification(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Notification deleted successfully'
        })
      );
    });

    it('should return 404 for non-existing notification', () => {
      req.params.id = 999;

      deleteNotification(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Notification not found'
        })
      );
    });
  });
});
