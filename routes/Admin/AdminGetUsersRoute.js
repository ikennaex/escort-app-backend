const express = require('express');
const { getAllEscorts, getAllVerifiedEscorts, getAllUnverifiedEscorts, getAllClients, getPremiumEscorts, getEscortsById, getAllUnverifiedEscortsById } = require('../../controllers/Admin/AdminGetUsersController');
const { adminAuth } = require('../../middleware/auth');
const router = express.Router()

router.get('/getallescorts', adminAuth, getAllEscorts);
router.get('/getallescorts/:id', adminAuth, getEscortsById);
router.get('/getverifiedescorts', adminAuth, getAllVerifiedEscorts);
router.get('/getunverifiedescorts', adminAuth, getAllUnverifiedEscorts);
router.get('/getunverifiedescorts/:id', adminAuth, getAllUnverifiedEscortsById);
router.get('/getpremiumescorts', adminAuth, getPremiumEscorts);
router.get('/getallclients', adminAuth, getAllClients); 

module.exports = router 