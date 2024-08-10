const request = require('supertest');
const express = require('express');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const { createObjectCsvWriter } = require('csv-writer');
const { generateVolunteerReportPDF, generateEventReportCSV } = require('../controllers/reportController');
const UserProfile = require('../models/UserProfile');
const VolunteerHistory = require('../models/VolunteerHistory');
const EventDetails = require('../models/EventDetails');

const app = express();
app.get('/api/reports/volunteers/pdf', generateVolunteerReportPDF);
app.get('/api/reports/events/csv', generateEventReportCSV);

beforeAll(async () => {
  // Mock MongoDB connection if necessary
});

afterAll(async () => {
  // Cleanup any resources if necessary
});

jest.mock('pdfkit');
jest.mock('csv-writer', () => ({
  createObjectCsvWriter: jest.fn(() => ({
    writeRecords: jest.fn(),
  })),
}));
jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  createReadStream: jest.fn(),
  unlinkSync: jest.fn(),
}));

describe('Report Controller', () => {
  describe('generateVolunteerReportPDF', () => {
    it('should generate a volunteer PDF report successfully', async () => {
      jest.spyOn(UserProfile, 'find').mockResolvedValue([{ _id: '1', fullName: 'John Doe' }]);
      jest.spyOn(VolunteerHistory, 'find').mockResolvedValue([
        { volunteerId: { _id: '1', fullName: 'John Doe' }, eventId: { eventName: 'Event 1' }, participationStatus: 'Attended' }
      ]);

      const response = await request(app).get('/api/reports/volunteers/pdf');
      expect(response.status).toBe(200);
      expect(PDFDocument).toHaveBeenCalled();
    });

    it('should handle errors during PDF generation', async () => {
      jest.spyOn(UserProfile, 'find').mockRejectedValue(new Error('Mocked error'));
      const response = await request(app).get('/api/reports/volunteers/pdf');
      expect(response.status).toBe(500);
    });
  });

  describe('generateEventReportCSV', () => {
    it('should generate an event CSV report successfully', async () => {
      jest.spyOn(EventDetails, 'find').mockResolvedValue([
        { eventName: 'Event 1', eventDescription: 'Description 1', location: 'Location 1', requiredSkills: ['Skill 1'], urgency: 'High', eventDate: '2023-08-15' }
      ]);

      const response = await request(app).get('/api/reports/events/csv');
      expect(response.status).toBe(200);
      expect(fs.createReadStream).toHaveBeenCalledWith(expect.stringContaining('Event_Report.csv'));
    });

    it('should handle errors during CSV generation', async () => {
      jest.spyOn(EventDetails, 'find').mockRejectedValue(new Error('Mocked error'));
      const response = await request(app).get('/api/reports/events/csv');
      expect(response.status).toBe(500);
    });
  });
});
