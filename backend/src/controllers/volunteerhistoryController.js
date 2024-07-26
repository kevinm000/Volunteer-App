const VolunteerHistory = require('../models/VolunteerHistory');

// Create a new volunteer history record
const createRecord = async (req, res) => {
  const { volunteerId, eventId, participationStatus, feedback } = req.body;

  try {
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
    const records = await VolunteerHistory.find().populate('volunteerId').populate('eventId');
    res.status(200).json(records);
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get volunteer history by volunteer ID
const getRecordsByVolunteerId = async (req, res) => {
  try {
    const records = await VolunteerHistory.find({ volunteerId: req.params.id }).populate('eventId');
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
  try {
    const records = await VolunteerHistory.find({ eventId: req.params.id }).populate('volunteerId');
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
  try {
    const updatedRecord = await VolunteerHistory.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
  try {
    const deletedRecord = await VolunteerHistory.findByIdAndDelete(req.params.id);
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
