const express = require('express');
const upload = require('../middleware/multer');
const { authToken, adminAuth } = require('../middleware/auth');
const { postPremiumReceipt, getPremiumReceipts } = require('../controllers/Escort/premiumPayments/EscortPremiumPaymentController');
const router = express.Router()

router.post('/receipt', authToken, upload.single("receipt"), postPremiumReceipt);

module.exports = router 