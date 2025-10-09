const express = require('express');
const { authToken } = require('../middleware/auth');
const { deleteProfile } = require('../controllers/Escort/deleteProfile/EscortDeleteProfileController');
const router = express.Router()

router.delete('/', authToken, deleteProfile);

module.exports = router 