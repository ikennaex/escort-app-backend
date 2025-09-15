const express = require('express');
const { authToken } = require('../middleware/auth');
const { postBankDetails, getBankDetails } = require('../controllers/Escort/EscortBankDetailsContoller');
const router = express.Router()

router.patch('/', authToken, postBankDetails);
router.get('/', authToken, getBankDetails);

module.exports = router 