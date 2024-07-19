const { sendNotification, getNotifications } = require('../controllers/notiController');

describe('Notification Controller', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('sendNotification', () => {
    it('should send a new notification', () => {
      req.body = {
        volunteerId: 1,
        message: 'You have been assigned a new event.',
      };

      sendNotification(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          volunteerId: 1,
          message: 'You have been assigned a new event.',
        })
      );
    });
  });

  describe('getNotifications', () => {
    it('should retrieve all notifications', () => {
      sendNotification(req, res); // First, send a notification
      getNotifications({}, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(Array.isArray(res.json.mock.calls[0][0])).toBe(true);
      expect(res.json.mock.calls[0][0].length).toBeGreaterThan(0);
    });
  });
});
