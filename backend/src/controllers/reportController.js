const PDFDocument = require('pdfkit');
const { createObjectCsvWriter } = require('csv-writer');
const VolunteerHistory = require('../models/VolunteerHistory');
const EventDetails = require('../models/EventDetails');
const UserProfile = require('../models/UserProfile');
const path = require('path');
const fs = require('fs');

const generateVolunteerReportPDF = async (req, res) => {
  const doc = new PDFDocument();
  let filename = 'Volunteer_Report';
  filename = encodeURIComponent(filename) + '.pdf';
  res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
  res.setHeader('Content-type', 'application/pdf');
  doc.pipe(res);

  const volunteers = await UserProfile.find();
  const volunteerHistory = await VolunteerHistory.find().populate('volunteerId eventId');

  doc.fontSize(16).text('Volunteer Report', { align: 'center' });

  volunteers.forEach((volunteer) => {
    doc.fontSize(12).text(`Name: ${volunteer.fullName}`);

    const history = volunteerHistory.filter(history => history.volunteerId._id.toString() === volunteer._id.toString());
    history.forEach(record => {
      doc.text(`Event: ${record.eventId.eventName}`);
      doc.text(`Status: ${record.participationStatus}`);
      doc.text(`Feedback: ${record.feedback || 'N/A'}`);
    });
    doc.moveDown();
  });

  doc.end();
};

// Generate Event Report as CSV
const generateEventReportCSV = async (req, res) => {
  const filePath = path.join(__dirname, 'Event_Report.csv');
  
  const csvWriter = createObjectCsvWriter({
    path: filePath, // Path where the CSV file will be saved
    header: [
      { id: 'eventName', title: 'Event Name' },
      { id: 'eventDescription', title: 'Description' },
      { id: 'location', title: 'Location' },
      { id: 'requiredSkills', title: 'Required Skills' },
      { id: 'urgency', title: 'Urgency' },
      { id: 'eventDate', title: 'Date' }
      // Add volunteerNames only if 'volunteers' exists in your schema
      // { id: 'volunteerNames', title: 'Volunteers' }
    ]
  });

  const events = await EventDetails.find(); // Remove .populate('volunteers') if unnecessary

  const records = events.map(event => ({
    eventName: event.eventName,
    eventDescription: event.eventDescription,
    location: event.location,
    requiredSkills: event.requiredSkills.join(', '),
    urgency: event.urgency,
    eventDate: event.eventDate,
    // Uncomment this line if 'volunteers' exists in your schema
    // volunteerNames: event.volunteers.map(vol => vol.fullName).join(', ')
  }));

  await csvWriter.writeRecords(records);

  // Set the correct headers and serve the file for download
  res.setHeader('Content-disposition', 'attachment; filename=Event_Report.csv');
  res.set('Content-Type', 'text/csv');

  // Stream the file to the client
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);

  // Optionally, delete the file after sending
  fileStream.on('end', () => {
    fs.unlinkSync(filePath);
  });
};

module.exports = {
  generateVolunteerReportPDF,
  generateEventReportCSV
};
