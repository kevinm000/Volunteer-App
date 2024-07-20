    // Mock data for volunteer history
    const volunteerhistory = [
      {
        volunteerName: 'John Doe',
        eventName: 'Community Clean-Up',
        eventDescription: 'Cleaning up the local park',
        location: 'Central Park',
        requiredSkills: ['Teamwork', 'Communication'],
        urgency: 'Medium',
        eventDate: '2023-06-15',
        participationStatus: 'Attended'
      }, 
      {
        volunteerName: 'Jane Smith',
        eventName: 'Food Drive',
        eventDescription: 'Collecting and distributing food to the needy',
        location: 'Downtown Community Center',
        requiredSkills: ['Organizing', 'Empathy'],
        urgency: 'High',
        eventDate: '2023-06-20',
        participationStatus: 'Attended'
      },
      {
        volunteerName: 'Marcus Jones',
        eventName: 'Beach Clean-Up',
        eventDescription: 'Cleaning up the beach',
        location: 'Downtown Community Center',
        requiredSkills: ['Organizing', 'Empathy'],
        urgency: 'High',
        eventDate: '2023-06-20',
        participationStatus: 'Attended'
      },
      { volunteerName: 'Jim Carey',
        eventName: 'Food Drive',
        eventDescription: 'Collecting and distributing food to the needy',
        location: 'Downtown Community Center',
        requiredSkills: ['Organizing', 'Empathy'],
        urgency: 'High',
        eventDate: '2023-06-15',
        participationStatus: 'Attended'
      }, 
      { volunteerName: 'Max Taylor',
        eventName: 'Car Wash',
        eventDescription: 'Helping wash cars',
        location: 'Downtown Community Center',
        requiredSkills: ['Organizing', 'Empathy'],
        urgency: 'High',
        eventDate: '2023-06-15',
        participationStatus: 'Attended'
      }
    ]
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
      // Initialize an empty array to hold the formatted event data
      const formattedEvents = [];
    
      // Create a dictionary to group participants by event
      const eventsGroupedByVolunteers = {};
    
      // Iterate through each volunteer history entry
      volunteerhistory.forEach(entry => {
        // Check if the event already exists in the dictionary
        if (!eventsGroupedByVolunteers[entry.eventName]) {
          // If not, create a new entry for the event
          eventsGroupedByVolunteers[entry.eventName] = {
            eventName: entry.eventName,
            eventDescription: entry.eventDescription,
            location: entry.location,
            requiredSkills: entry.requiredSkills,
            urgency: entry.urgency,
            eventDate: entry.eventDate,
            participants: []
          };
        }
    
        // Add the volunteer to the participants array for the event
        eventsGroupedByVolunteers[entry.eventName].participants.push({
          volunteerName: entry.volunteerName,
          participationStatus: entry.participationStatus
        });
      });
    
      // Convert the dictionary to an array and format the output as specified
      Object.values(eventsGroupedByVolunteers).forEach(event => {
        formattedEvents.push({
          eventName: event.eventName,
          eventDescription: event.eventDescription,
          location: event.location,
          requiredSkills: event.requiredSkills,
          urgency: event.urgency,
          eventDate: event.eventDate,
          participants: event.participants.map(participant => ({
            volunteerName: participant.volunteerName,
            participationStatus: participant.participationStatus
          }))
        });
      });
    
      // Send the formatted output as the response, with 2 spaces for indentation
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(formattedEvents, null, 2));
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
      getEventById,
      createEvent,
      updateEvent,
      deleteEvent,
    };