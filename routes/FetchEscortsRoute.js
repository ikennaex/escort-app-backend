const express = require('express');
const { getEscorts, getEscortsById, filteredEscort } = require('../controllers/Escort/details/fetchEscortsController');
const router = express.Router()

router.get('/', getEscorts);
router.get('/search', filteredEscort)
router.get('/:id', getEscortsById)

module.exports = router 