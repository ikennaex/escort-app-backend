const express = require('express');
const { getEscorts } = require('../controllers/Escort/details/fetchEscortsController');
const router = express.Router()

router.get('/', getEscorts);

module.exports = router 