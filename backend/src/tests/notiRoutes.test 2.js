// src/tests/notiRoutes.test.js

// Print the current directory
//console.log('Current directory:', __dirname);

const path = require('path');
const request = require('supertest');

// Print the resolved path to server.js
const serverPath = path.resolve(__dirname, '../../server.js');
console.log('Resolved path to server.js:', serverPath);

try {
  const app = require(serverPath); // Use the resolved path

  describe('Notification Routes', () => {
    it('should send a new notification', async () => {
      const response = await request(app)
        .post('/api/notifications/send')
        .send({
          volunteerId: 1,
          message: 'You have been assigned a new event.',
        });
      expect(response.status).toBe(201);
      expect(response.body.volunteerId).toBe(1);
      expect(response.body.message).toBe('You have been assigned a new event.');
    });

    it('should retrieve all notifications', async () => {
      // Send a notification to have at least one in the system
      await request(app)
        .post('/api/notifications/send')
        .send({
          volunteerId: 1,
          message: 'You have been assigned a new event.',
        });

      const response = await request(app).get('/api/notifications');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
} catch (error) {
  console.error('Error requiring server.js:', error);
}
