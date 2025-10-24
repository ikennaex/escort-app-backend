const express = require('express');
const { adminAuth } = require('../../middleware/auth');
const { blacklistEscort, getBlacklistedEscorts, getBlacklistedEscortsById } = require('../../controllers/Admin/AdminBlacklistController');
const router = express.Router()

router.post('/blacklist', adminAuth, blacklistEscort); 
router.get('/blacklist', getBlacklistedEscorts);  // available to everyone
router.get('/blacklisted-escort/:id', getBlacklistedEscortsById);  // available to everyone


module.exports = router 