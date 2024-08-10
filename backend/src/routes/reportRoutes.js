const express = require('express');
const router = express.Router();
const { generateVolunteerReportPDF, generateEventReportCSV } = require('../controllers/reportController');

router.get('/volunteer-report/pdf', generateVolunteerReportPDF);
router.get('/event-report/csv', generateEventReportCSV); // Route for CSV generation

module.exports = router;
