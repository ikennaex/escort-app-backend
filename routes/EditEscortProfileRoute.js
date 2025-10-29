const express = require('express');
const { authToken } = require('../middleware/auth');
const { editProfile, editLocation } = require('../controllers/Escort/editEscortProfileController');
const router = express.Router()

router.patch('/', authToken, editProfile);
router.patch('/location', authToken, editLocation);

module.exports = router 