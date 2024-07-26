/*const events = [
  {
    id: 1,
    eventName: 'Beach Cleanup',
    eventDescription: 'Join us for a beach cleanup event to help keep our beaches clean and beautiful.',
    location: 'Santa Monica Beach, CA',
    requiredSkills: ['Teamwork', 'Time Management'],
    urgency: 'High',
    eventDate: '2023-08-15',
  },
  {
    id: 2,
    eventName: 'Community Garden Planting',
    eventDescription: 'Help us plant a new community garden and learn about sustainable gardening practices.',
    location: 'Downtown Community Center, NY',
    requiredSkills: ['Gardening', 'Teamwork', 'Creativity'],
    urgency: 'Medium',
    eventDate: '2023-09-20',
  },
  {
    id: 3,
    eventName: 'Food Drive',
    eventDescription: 'Participate in our food drive to collect and distribute food to those in need.',
    location: 'Local Food Bank, TX',
    requiredSkills: ['Communication', 'Empathy'],
    urgency: 'Low',
    eventDate: '2023-10-10',
  },
];

const getAllEvents = (req, res) => {
  res.json(events);
};

const getEventById = (req, res) => {
  const event = events.find(e => e.id === parseInt(req.params.id));
  if (!event) return res.status(404).send('Event not found');
  res.json(event);
};

const createEvent = (req, res) => {
  const event = {
    id: events.length + 1,
    eventName: req.body.eventName,
    eventDescription: req.body.eventDescription,
    location: req.body.location,
    requiredSkills: req.body.requiredSkills,
    urgency: req.body.urgency,
    eventDate: req.body.eventDate,
  };
  events.push(event);
  res.status(201).json(event);
};

const updateEvent = (req, res) => {
  const event = events.find(e => e.id === parseInt(req.params.id));
  if (!event) return res.status(404).send('Event not found');

  event.eventName = req.body.eventName;
  event.eventDescription = req.body.eventDescription;
  event.location = req.body.location;
  event.requiredSkills = req.body.requiredSkills;
  event.urgency = req.body.urgency;
  event.eventDate = req.body.eventDate;

  res.json(event);
};

const resetEvents = (newEvents) => {
  events.length = 0;
  events.push(...newEvents);
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
 // deleteEvent,
  resetEvents, // Export the reset function for testing
};
*/

// controllers/eventController.js
const EventDetails = require('../models/EventDetails');

// Create a new event
const createEvent = async (req, res) => {
  try {
    const event = new EventDetails({
      eventName: req.body.eventName,
      eventDescription: req.body.eventDescription,
      location: req.body.location,
      requiredSkills: req.body.requiredSkills,
      urgency: req.body.urgency,
      eventDate: req.body.eventDate,
    });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await EventDetails.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single event by ID
const getEventById = async (req, res) => {
  try {
    const event = await EventDetails.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
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
    res.json(updatedEvent);
  } catch (error) {
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
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent
};
