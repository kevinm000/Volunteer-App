const VolunteerMatch = require('../models/VolunteerMatch');
const UserProfile = require('../models/UserProfile');
const EventDetails = require('../models/EventDetails');

// Function to match volunteers to events
const matchVolunteers = async (eventId) => {
  try {
    // Find the event by ID
    const event = await EventDetails.findById(eventId);
    if (!event) {
      throw new Error('Event not found');
    }

    // Find all volunteers
    const volunteers = await UserProfile.find();

    // Filter volunteers based on event requirements
    const matchedVolunteers = volunteers.filter(volunteer => {
      const hasRequiredSkills = event.requiredSkills.every(skill => volunteer.skills.includes(skill));
      const isAvailable = volunteer.availability.some(date => date.toISOString().split('T')[0] === event.eventDate.toISOString().split('T')[0]);

      return hasRequiredSkills && isAvailable;
    });

    return matchedVolunteers;
  } catch (error) {
    console.error('Error matching volunteers:', error);
    throw error;
  }
};

// Controller function to handle matching request
const getMatchedVolunteers = async (req, res) => {
  try {
    const { eventId } = req.params;

    const matchedVolunteers = await matchVolunteers(eventId);

    res.status(200).json(matchedVolunteers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to match volunteers', error: error.message });
  }
};


// Create a new volunteer match
const createEvent = async (req, res) => {
  try {
    const { eventName, eventDescription, location, requiredSkills, urgency, eventDate } = req.body;

    const newEvent = new VolunteerMatch({
      eventName,
      eventDescription,
      location,
      requiredSkills,
      urgency,
      eventDate
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(400).json({ message: error.message });
  }
};

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await EventDetails.find();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all matched profiles
const getMatchedProfiles = async (req, res) => {
  try {
    const matchedProfiles = await VolunteerMatch.find().populate('profiles');
    res.status(200).json(matchedProfiles);
  } catch (error) {
    console.error('Error fetching matched profiles:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get an event by ID
const getEventById = async (req, res) => {
  try {
    const event = await EventDetails.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error('Error fetching event by ID:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update an event by ID
const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await EventDetails.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(400).json({ message: error.message });
  }
};

// Delete an event by ID
const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await EventDetails.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  matchVolunteers,        // Export the function to match volunteers
  getMatchedVolunteers,   // Export the function to get matched volunteers
  createEvent,            // Export the function to create a new event
  getAllEvents,           // Export the function to get all events
  getMatchedProfiles,     // Export the function to get all matched profiles
  getEventById,           // Export the function to get an event by ID
  updateEvent,            // Export the function to update an event by ID
  deleteEvent             // Export the function to delete an event by ID
};