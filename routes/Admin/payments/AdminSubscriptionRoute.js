const express = require('express');
const { getSubcriptionDetails } = require('../../../controllers/Admin/AdminSubcriptionController');
const { adminAuth } = require('../../../middleware/auth');
const router = express.Router()

router.get('/subscriptiondetails', adminAuth, getSubcriptionDetails);

module.exports = router 