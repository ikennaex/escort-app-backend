const express = require('express');
const { clientRegister } = require('../controllers/Client/ClientRegisterController');
const router = express.Router()


router.post('/clientsignup', clientRegister);
// router.post('/verifyotp', verifyClientOtp);

module.exports = router