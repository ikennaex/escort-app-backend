const express = require('express');
const { login, logout } = require('../controllers/Login/LoginController');
const { refreshTokenHandler } = require('../controllers/refreshTokenController');
const { getLoggedUserProfile } = require('../controllers/getProfileController');
const { authToken } = require('../middleware/auth');
const router = express.Router()

router.post('/signin', login);

// refresh token and user profile 
router.post('/refresh', refreshTokenHandler);
router.get('/profile', authToken, getLoggedUserProfile);

router.post('/logout', authToken, logout);

module.exports = router