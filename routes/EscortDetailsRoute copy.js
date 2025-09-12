const express = require('express');
const { escortDetails } = require('../controllers/Escort/onboarding/EscortDetailsController');
const { authToken } = require('../middleware/auth');
const router = express.Router()

router.put('/', authToken, escortDetails);

module.exports = router 