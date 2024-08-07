const VolunteerHistory = require('../models/VolunteerHistory');
const Event = require('../models/Event'); // Assuming you have an Event model
const UserProfile = require('../models/UserProfile'); // Assuming you need this for user details

// Create a new volunteer history record
const createRecord = async (req, res) => {
  const { volunteerId, eventId, participationStatus, feedback } = req.body;

  try {
    // Validate input data
    if (!volunteerId || !eventId) {
      return res.status(400).json({ message: 'Volunteer ID and Event ID are required' });
    }

    // Check if volunteer and event exist
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const volunteerProfile = await UserProfile.findById(volunteerId);
    if (!volunteerProfile) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    // Create a new record
    const newRecord = new VolunteerHistory({
      volunteerId,
      eventId,
      participationStatus,
      feedback
    });

    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    console.error('Error creating record:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all volunteer history records
const getAllRecords = async (req, res) => {
  try {
    const records = await VolunteerHistory.find()
      .populate('volunteerId', 'fullName') // Only populate needed fields
      .populate('eventId', 'eventName'); // Only populate needed fields
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
      .populate('eventId', 'eventName'); // Only populate needed fields

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
