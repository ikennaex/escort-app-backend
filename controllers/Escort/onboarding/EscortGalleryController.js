const EscortModel = require("../../../models/Escort");
const uploadToCloudinary = require("../../../utils/cloudinary/cloudinary");

const escortGallery = async (req, res) => {
    // check if theres a file in the request
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "At least one media file is required" });
  }

  try {
    const uploadedImages = [];
    for (const file of req.files) {
      const result = await uploadToCloudinary(file.buffer, "oscrovilla/gallery");
      uploadedImages.push(result.secure_url);
    }

    const galleryDoc = await EscortModel.findByIdAndUpdate(
      req.user.id,
      { $push: { gallery: { $each: uploadedImages } } }, // add all images
      { new: true, runValidators: true }
    );

    res.status(201).json({ message: "Gallery Upload Successful", gallery: galleryDoc.gallery });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gallery Upload Failed" });
  }
};

module.exports = { escortGallery };
