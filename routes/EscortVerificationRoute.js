const express = require('express');
const {upload} = require('../middleware/multer');
const { authToken } = require('../middleware/auth');
const { escortVerificationImage } = require('../controllers/Escort/onboarding/EscortVerificationController');
const router = express.Router()

router.put('/', authToken, upload.single("verificationImg"), escortVerificationImage);

module.exports = router 