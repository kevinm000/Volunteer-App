const PDFDocument = require('pdfkit');
const { createObjectCsvWriter } = require('csv-writer');
const VolunteerHistory = require('../models/VolunteerHistory');
const EventDetails = require('../models/EventDetails');
const UserProfile = require('../models/UserProfile');

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
    doc.fontSize(12).text(`Name: ${volunteer.name}`);
    doc.text(`Email: ${volunteer.email}`);
    doc.text(`Phone: ${volunteer.phone}`);

    const history = volunteerHistory.filter(history => history.volunteerId._id.toString() === volunteer._id.toString());
    history.forEach(record => {
      doc.text(`Event: ${record.eventId.eventName}`);
      doc.text(`Status: ${record.participationStatus}`);
      doc.text(`Feedback: ${record.feedback}`);
    });
    doc.moveDown();
  });

  doc.end();
};

const generateEventReportCSV = async (req, res) => {
  const csvWriter = createObjectCsvWriter({
    path: 'Event_Report.csv',
    header: [
      { id: 'eventName', title: 'Event Name' },
      { id: 'eventDescription', title: 'Description' },
      { id: 'location', title: 'Location' },
      { id: 'requiredSkills', title: 'Required Skills' },
      { id: 'urgency', title: 'Urgency' },
      { id: 'eventDate', title: 'Date' },
      { id: 'volunteerNames', title: 'Volunteers' }
    ]
  });

  const events = await EventDetails.find().populate('volunteers');

  const records = events.map(event => ({
    eventName: event.eventName,
    eventDescription: event.eventDescription,
    location: event.location,
    requiredSkills: event.requiredSkills.join(', '),
    urgency: event.urgency,
    eventDate: event.eventDate,
    volunteerNames: event.volunteers.map(vol => vol.name).join(', ')
  }));

  await csvWriter.writeRecords(records);
  res.download('Event_Report.csv');
};

module.exports = {
  generateVolunteerReportPDF,
  generateEventReportCSV
};
