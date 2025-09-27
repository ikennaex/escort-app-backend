const express = require('express');
const { authToken } = require('../middleware/auth');
const { getSubcriptionDetails } = require('../controllers/Escort/payment/subscriptionDetailsController');
const router = express.Router()

router.get('/subscriptiondetails', authToken, getSubcriptionDetails); 

module.exports = router 