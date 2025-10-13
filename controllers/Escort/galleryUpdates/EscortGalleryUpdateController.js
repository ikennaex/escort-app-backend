const cloudinary = require("../../../config/cloudinary");
const EscortModel = require("../../../models/Escort");
const uploadToCloudinary = require("../../../utils/cloudinary/cloudinary");

const updateEscortGallery = async (req, res) => {

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "At least one image is required" });
  }

  try {
    const uploadedImages = [];

    // Upload each file to Cloudinary
    for (const file of req.files) {
      const result = await uploadToCloudinary(
        file.buffer,
        "oscrovilla/gallery"
      );
      uploadedImages.push(result.secure_url);
    }

    // Push new images into gallery array
    const updatedEscort = await EscortModel.findByIdAndUpdate(
      req.user.id,
      { $push: { gallery: { $each: uploadedImages } } },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Images added successfully",
      gallery: updatedEscort.gallery,
    });
  } catch (error) {
    console.error("Error adding gallery images:", error);
    res.status(500).json({ message: "Error adding gallery images" });
  }
};

const deleteGalleryImage = async (req, res) => {
  const { escortId, imageUrl } = req.body; // or from req.params

  try {
    // Extract Cloudinary public ID from the URL
    const publicId = imageUrl.split("/").slice(-2).join("/").split(".")[0];

    const fullPublicId = publicId.startsWith("oscrovilla/")
      ? publicId
      : `oscrovilla/${publicId}`;

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(fullPublicId);

    const updatedEscort = await EscortModel.findByIdAndUpdate(
      escortId,
      { $pull: { gallery: imageUrl } },
      { new: true }
    );

    if (!updatedEscort) {
      return res.status(404).json({ message: "Escort not found" });
    }

    res.status(200).json({
      message: "Image deleted successfully",
      gallery: updatedEscort.gallery,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { deleteGalleryImage, updateEscortGallery };
