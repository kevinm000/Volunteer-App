
const volunteerhistoryController = require('../controllers/volunteerhistoryController');
const express = require('express');
const VolunteerHistory = require('../models/VolunteerHistory');
const router = express.Router();

// Create a new volunteer history record
router.post('/create', async (req, res) => {
  try {
    const { volunteerId, eventId, participationStatus, feedback } = req.body;

    const newRecord = new VolunteerHistory({
      volunteerId,
      eventId,
      participationStatus,
      feedback
    });

    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all volunteer history records
router.get('/', async (req, res) => {
  try {
    const records = await VolunteerHistory.find().populate('volunteerId').populate('eventId');
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get volunteer history by volunteer ID
router.get('/volunteer/:id', async (req, res) => {
  try {
    const records = await VolunteerHistory.find({ volunteerId: req.params.id }).populate('eventId');
    if (!records) {
      return res.status(404).json({ message: 'No records found for this volunteer' });
    }
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get volunteer history by event ID
router.get('/event/:id', async (req, res) => {
  try {
    const records = await VolunteerHistory.find({ eventId: req.params.id }).populate('volunteerId');
    if (!records) {
      return res.status(404).json({ message: 'No records found for this event' });
    }
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a volunteer history record by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedRecord = await VolunteerHistory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json(updatedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a volunteer history record by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedRecord = await VolunteerHistory.findByIdAndDelete(req.params.id);
    if (!deletedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json({ message: 'Record deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


