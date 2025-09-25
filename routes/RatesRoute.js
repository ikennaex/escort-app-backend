const express = require('express');
const { getRates } = require('../controllers/ratesController');
const router = express.Router()

router.get('/premium/rates', getRates);


module.exports = router 