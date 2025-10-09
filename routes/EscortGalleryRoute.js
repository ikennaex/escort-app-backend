const express = require('express');
const { escortGallery } = require('../controllers/Escort/onboarding/EscortGalleryController');
const upload = require('../middleware/multer');
const { authToken } = require('../middleware/auth');
const { deleteGalleryImage, updateEscortGallery } = require('../controllers/Escort/galleryUpdates/EscortGalleryUpdateController');
const router = express.Router()

router.put('/', authToken, upload.array("gallery", 10), escortGallery); // for onboarding

// for updates to add and delete images
router.delete('/', authToken, deleteGalleryImage); 
router.post('/add', authToken, upload.array("gallery", 10), updateEscortGallery);

module.exports = router 