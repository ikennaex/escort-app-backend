const express = require('express');
const { escortRegister } = require('../controllers/Escort/onboarding/EscortRegisterController');
const { verifyEscortOtp } = require('../controllers/verifyOTPController');
const router = express.Router()

router.post('/escortsignup', escortRegister);
router.post('/verifyotp', verifyEscortOtp);

module.exports = router