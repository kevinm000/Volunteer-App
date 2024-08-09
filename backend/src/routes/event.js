const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const notificationController = require('../controllers/notiController'); // Import the notificationController

// Route to create a new event
router.post('/create', async (req, res) => {
  try {
    // Create the event
    const event = await eventController.createEvent(req, res);

    // Fetch all volunteers and send notifications
    if (event) {
      const volunteers = await UserProfile.find(); // Ensure UserProfile is imported
      for (const volunteer of volunteers) {
        const message = `A new event "${event.eventName}" has been created. Check it out!`;
        await notificationController.sendNotification({
          body: { volunteerId: volunteer.userId, message }
        }, { status: () => ({ json: () => {} }) }); // Simulate response for notification
      }
    }
  } catch (error) {
    console.error('Error creating event and sending notifications:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Route to get all events
router.get('/', eventController.getAllEvents);

// Route to get a single event by ID
router.get('/:id', eventController.getEventById);

// Route to update an event by ID
router.put('/:id', eventController.updateEvent);

// Route to delete an event by ID
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
