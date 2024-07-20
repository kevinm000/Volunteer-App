const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const volunteerhistoryRoutes = require('../routes/volunteerhistory');

const app = express();
app.use(bodyParser.json());
app.use('/api/volunteerhistory', volunteerhistoryRoutes);

describe('Volunteer History Controller', () => {
  it('should get all events', async () => {
    const res = await request(app).get('/api/volunteerhistory');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
  });

  it('should get event by ID', async () => {
    const res = await request(app).get('/api/volunteerhistory/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
  });
});
