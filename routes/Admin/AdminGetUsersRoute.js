const express = require('express');
const { getAllEscorts, getAllVerifiedEscorts, getAllUnverifiedEscorts, getAllClients, getPremiumEscorts, getEscortsById, getAllUnverifiedEscortsById } = require('../../controllers/Admin/AdminGetUsersController');
const router = express.Router()

router.get('/getallescorts', getAllEscorts);
router.get('/getallescorts/:id', getEscortsById);
router.get('/getverifiedescorts', getAllVerifiedEscorts);
router.get('/getunverifiedescorts', getAllUnverifiedEscorts);
router.get('/getunverifiedescorts/:id', getAllUnverifiedEscortsById);
router.get('/getpremiumescorts', getPremiumEscorts);
router.get('/getallclients', getAllClients); 

module.exports = router 