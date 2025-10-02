const express = require('express');
const { checkUserExists } = require('../controllers/Escort/details/checkUserExistsController');
const router = express.Router()

router.get('/escorts/check', checkUserExists);

module.exports = router