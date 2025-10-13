const express = require('express');
const { adminAuth } = require('../../middleware/auth');
const { getReports } = require('../../controllers/Escort/report/EscortReportController');
const router = express.Router()

router.get('/getreports', adminAuth, getReports);


module.exports = router 