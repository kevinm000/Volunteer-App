let events = [
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

const deleteEvent = (req, res) => {
  const eventIndex = events.findIndex(e => e.id === parseInt(req.params.id));
  if (eventIndex === -1) return res.status(404).send('Event not found');

  const [deletedEvent] = events.splice(eventIndex, 1); // Destructure to get the deleted event
  res.json(deletedEvent); // Return the deleted event
};

const resetEvents = (newEvents) => {
  events = newEvents;
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  resetEvents, // Export reset function for testing
};
