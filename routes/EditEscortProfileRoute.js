const express = require('express');
const { authToken } = require('../middleware/auth');
const { editProfile } = require('../controllers/Escort/editEscortProfileController');
const router = express.Router()

router.patch('/', authToken, editProfile);

module.exports = router 