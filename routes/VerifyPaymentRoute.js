const express = require('express');
const { authToken } = require('../middleware/auth');
const { verifyPayment } = require('../controllers/Escort/payment/verifyPaymentController');
const router = express.Router()

router.post('/verify-payment', authToken, verifyPayment); 

module.exports = router 