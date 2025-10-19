const express = require('express');
const { adminAuth } = require('../../../middleware/auth');
const { getPremiumReceipts } = require('../../../controllers/Admin/AdminPremiumReceiptController');
const router = express.Router()

router.get('/receipts', adminAuth, getPremiumReceipts);

module.exports = router 