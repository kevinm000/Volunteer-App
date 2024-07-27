const express = require('express');
const router = express.Router();
const volunteerMatchController = require('../controllers/volunteerMatchController');

router.get('/', volunteerMatchController.getMatches);
router.post('/', volunteerMatchController.createMatch);

module.exports = router;
