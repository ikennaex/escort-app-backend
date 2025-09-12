const express = require('express');
const { escortGallery } = require('../controllers/Escort/onboarding/EscortGalleryController');
const upload = require('../middleware/multer');
const { authToken } = require('../middleware/auth');
const router = express.Router()

router.put('/', authToken, upload.array("gallery", 10), escortGallery);

module.exports = router 