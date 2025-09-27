const express = require('express');
const { getSubcriptionDetails } = require('../../../controllers/Admin/AdminSubcriptionController');
const router = express.Router()

router.get('/subscriptiondetails', getSubcriptionDetails);

module.exports = router 