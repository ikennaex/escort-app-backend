const express = require('express');
const { postReport } = require('../controllers/Escort/report/EscortReportController');
const {upload} = require('../middleware/multer');
const router = express.Router()

router.post('/', upload.array("images", 10), postReport);

module.exports = router 