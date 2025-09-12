const express = require('express');
const { authToken } = require('../middleware/auth');
const { escortRates } = require('../controllers/Escort/onboarding/EscortRatesController');
const router = express.Router()

router.put('/', authToken, escortRates);

module.exports = router 