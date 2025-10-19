const express = require('express');
const { adminAuth } = require('../../../middleware/auth');
const { approvePayment, rejectPayment } = require('../../../controllers/Admin/AdminApprovePaymentController');
const router = express.Router()

router.post('/approve-receipts', adminAuth, approvePayment); 
router.post('/reject-receipts', adminAuth, rejectPayment); 

module.exports = router 