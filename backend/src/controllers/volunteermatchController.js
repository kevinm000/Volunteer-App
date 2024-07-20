// Mock data for volunteer matching

const profiles = [
  {
    id: 1,
    fullName: 'John Doe',
    address1: '123 Main St',
    address2: 'Apt 4B',
    city: 'Anytown',
    state: 'CA',
    zipCode: '90210',
    skills: ['Communication', 'Teamwork'],
    preferences: 'Prefers outdoor activities',
    availability: ['2023-08-15', '2023-09-20'],
  },
  {
    id: 2,
    fullName: 'Jane Smith',
    address1: '456 Elm St',
    address2: '',
    city: 'Othertown',
    state: 'NY',
    zipCode: '10001',
    skills: ['Leadership', 'Time Management'],
    preferences: 'Likes working with children',
    availability: ['2023-10-10', '2023-11-15'],
  },
  {
    id: 3,
    fullName: 'Alice Johnson',
    address1: '789 Maple Ave',
    address2: 'Suite 5C',
    city: 'Somecity',
    state: 'TX',
    zipCode: '73301',
    skills: ['Problem Solving', 'Creativity'],
    preferences: 'Enjoys community outreach programs',
    availability: ['2023-12-01', '2023-12-15'],
  },
];

const events = [
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
    eventDate: '2023-12-01',
  },
  {
    id: 3,
    eventName: 'Food Drive',
    eventDescription: 'Participate in our food drive to collect and distribute food to those in need.',
    location: 'Local Food Bank, TX',
    requiredSkills: ['Communication', 'Leadership'],
    urgency: 'Low',
    eventDate: '2023-10-10',
  },
];

const matchProfilesToEvents = () => {
  const matches = {};

  profiles.forEach(profile => {
    events.forEach(event => {
      const hasMatchingSkill = event.requiredSkills.some(skill => profile.skills.includes(skill));
      const hasMatchingDate = profile.availability.includes(event.eventDate);

      if (hasMatchingSkill && hasMatchingDate) {
        // Initialize the event entry if it doesn't exist
        if (!matches[event.eventName]) {
          matches[event.eventName] = {
            eventDate: event.eventDate,
            requiredSkills: event.requiredSkills,
            matches: []
          };
        }
        // Add the profile to the corresponding event
        matches[event.eventName].matches.push({
          person: {
            fullName: profile.fullName,
            address: `${profile.address1} ${profile.address2 ? profile.address2 + ', ' : ''}${profile.city}, ${profile.state} ${profile.zipCode}`,
            preferences: profile.preferences,
          },
          MatchingSkills: profile.skills.filter(skill => event.requiredSkills.includes(skill)),
          MatchingAvailability: event.eventDate
        });
      }
    });
  });

  // Convert the matches object into an array for easier handling in responses
  return Object.keys(matches).map(eventName => ({
    eventName,
    eventDate: matches[eventName].eventDate,
    requiredSkills: matches[eventName].requiredSkills,
    matches: matches[eventName].matches
  }));
};

const getAllEvents = (req, res) => {
  res.json(events);
};

const getMatchedProfiles = (req, res) => {
  const matchedProfiles = matchProfilesToEvents();
  // Convert the matched profiles to a formatted JSON string
  const formattedJson = JSON.stringify(matchedProfiles, null, 2);
  res.setHeader('Content-Type', 'application/json');
  res.send(formattedJson);
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

  const deletedEvent = events.splice(eventIndex, 1);
  res.json(deletedEvent);
};

module.exports = {
  getAllEvents,
  getMatchedProfiles,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
