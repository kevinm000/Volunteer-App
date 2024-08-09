const EventDetails = require('../models/EventDetails');
const { validationResult } = require('express-validator');
const { sendNotification } = require('./notiController'); // Import the sendNotification function
const UserProfile = require('../models/UserProfile'); // Import UserProfile to get all volunteers

const createEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { eventName, eventDescription, location, requiredSkills, urgency, eventDate } = req.body;

  try {
    const event = new EventDetails({
      eventName,
      eventDescription,
      location,
      requiredSkills,
      urgency,
      eventDate,
    });

    await event.save();

    // Fetch all volunteers
    const volunteers = await UserProfile.find();

    // Send notification to each volunteer
    for (const volunteer of volunteers) {
      const message = `A new event "${eventName}" has been created. Check it out!`;
      sendNotification({ body: { volunteerId: volunteer.userId, message } }, { status: () => ({ json: () => {} }) }); // Simulate response
    }

    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await EventDetails.find();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getEventById = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await EventDetails.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { eventName, eventDescription, location, requiredSkills, urgency, eventDate } = req.body;

  try {
    const updatedEvent = await EventDetails.findByIdAndUpdate(id, {
      eventName,
      eventDescription,
      location,
      requiredSkills,
      urgency,
      eventDate,
    }, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event updated successfully', updatedEvent });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(400).json({ message: 'Bad request', error: error.message });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await EventDetails.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
