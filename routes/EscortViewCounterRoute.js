const express = require('express');
const { viewCounter } = require('../controllers/Escort/viewCounter/viewCounter');
const router = express.Router()

router.post('/:id', viewCounter);

module.exports = router 