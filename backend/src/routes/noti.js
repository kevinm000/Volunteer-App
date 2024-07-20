const express = require('express');
const { sendNotification, getNotifications, deleteNotification } = require('../controllers/notiController');

const router = express.Router();

router.post('/send', sendNotification);
router.get('/', getNotifications);
router.delete('/:id', deleteNotification); 

module.exports = router;
