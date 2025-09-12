const express = require('express');
const { authToken } = require('../middleware/auth');
const { escortServices } = require('../controllers/Escort/onboarding/EscortServicesController');
const router = express.Router()

router.put('/', authToken, escortServices);

module.exports = router 