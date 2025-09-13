const express = require('express');
const { getEscorts, getEscortsById } = require('../controllers/Escort/details/fetchEscortsController');
const router = express.Router()

router.get('/', getEscorts);
router.get('/:id', getEscortsById)

module.exports = router 