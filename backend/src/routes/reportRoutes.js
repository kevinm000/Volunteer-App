const express = require('express');
const { generateVolunteerReportPDF, generateEventReportCSV } = require('../controllers/reportController');

const router = express.Router();

router.get('/volunteer-report/pdf', generateVolunteerReportPDF);
router.get('/event-report/csv', generateEventReportCSV);

module.exports = router;
