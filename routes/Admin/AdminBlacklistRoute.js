const express = require('express');
const { adminAuth } = require('../../middleware/auth');
const { blacklistEscort, getBlacklistedEscorts } = require('../../controllers/Admin/AdminBlacklistController');
const router = express.Router()

router.post('/blacklist', adminAuth, blacklistEscort);
router.get('/blacklist', getBlacklistedEscorts);  // available to everyone


module.exports = router 