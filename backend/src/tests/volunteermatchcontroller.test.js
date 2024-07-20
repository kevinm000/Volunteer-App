const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const volunteermatchRoutes = require('../routes/volunteermatch');

const app = express();
app.use(bodyParser.json());
app.use('/api/volunteermatch', volunteermatchRoutes);

describe('Volunteer Match Controller', () => {
  it('should get matched profiles', async () => {
    const res = await request(app).get('/api/volunteermatch');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
  });
});
