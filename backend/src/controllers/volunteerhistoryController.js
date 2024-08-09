const VolunteerHistory = require('../models/VolunteerHistory');
const EventDetails = require('../models/EventDetails'); // Updated to use correct model name
const UserProfile = require('../models/UserProfile'); // Assuming you need this for user details

const createRecord = async (req, res) => {
  const { eventId, feedback } = req.body;
  const volunteerId = req.body.volunteerId; // Read from request body

  try {
    // Validate input data
    if (!eventId || !volunteerId) {
      return res.status(400).json({ message: 'Event ID and Volunteer ID are required' });
    }

    // Check if event exists
    const event = await EventDetails.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Create a new record
    const newRecord = new VolunteerHistory({
      volunteerId,
      eventId,
      participationStatus: 'Attended',
      feedback: feedback || ''
    });

    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    console.error('Error creating record:', error);
    res.status(500).json({ message: error.message });
  }
};


const getAllRecords = async (req, res) => {
  try {
    const records = await VolunteerHistory.find()
      .populate('volunteerId', 'fullName') // Populate fullName from UserProfile
      .populate('eventId', 'eventName eventDescription location requiredSkills urgency eventDate'); // Populate all necessary fields from EventDetails
    res.status(200).json(records);
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ message: error.message });
  }
};


// Get volunteer history by volunteer ID
const getRecordsByVolunteerId = async (req, res) => {
  const { id } = req.params;

  try {
    const records = await VolunteerHistory.find({ volunteerId: id })
    .populate('eventId', 'eventName eventDescription location requiredSkills urgency eventDate');

    if (!records.length) {
      return res.status(404).json({ message: 'No records found for this volunteer' });
    }
    res.status(200).json(records);
  } catch (error) {
    console.error('Error fetching records by volunteer ID:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get volunteer history by event ID
const getRecordsByEventId = async (req, res) => {
  const { id } = req.params;

  try {
    const records = await VolunteerHistory.find({ eventId: id })
      .populate('volunteerId', 'fullName'); // Only populate needed fields

    if (!records.length) {
      return res.status(404).json({ message: 'No records found for this event' });
    }
    res.status(200).json(records);
  } catch (error) {
    console.error('Error fetching records by event ID:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update a volunteer history record by ID
const updateRecord = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedRecord = await VolunteerHistory.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json(updatedRecord);
  } catch (error) {
    console.error('Error updating record:', error);
    res.status(400).json({ message: error.message });
  }
};

// Delete a volunteer history record by ID
const deleteRecord = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRecord = await VolunteerHistory.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json({ message: 'Record deleted' });
  } catch (error) {
    console.error('Error deleting record:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRecord,
  getAllRecords,
  getRecordsByVolunteerId,
  getRecordsByEventId,
  updateRecord,
  deleteRecord
};
