const express = require('express');
const { adminRegister, adminLogin, adminLogout } = require('../../controllers/Admin/AdminLoginController');
const { adminRefreshTokenHandler } = require('../../controllers/Admin/AdminRefreshTokenController.');
const { getAdminProfile } = require('../../controllers/Admin/AdminProfileController');
const { adminAuth } = require('../../middleware/auth');
const router = express.Router()

// router.post('/register', adminRegister);
router.post('/login', adminLogin);
router.post('/refresh', adminRefreshTokenHandler);
router.post('/logout', adminAuth, adminLogout);

router.get('/profile', adminAuth, getAdminProfile);

module.exports = router 