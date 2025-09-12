const EscortModel = require("../../../models/Escort");
const uploadToCloudinary = require("../../../utils/cloudinary/cloudinary");

const escortVerificationImage = async (req, res) => {
  // check if theres a file in the request
  if (!req.file || req.file.length === 0) {
    return res
      .status(400)
      .json({ message: "At least one media file is required" });
  }

  try {
    // check if a file was uploaded
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Verification image is required" });
    }

    // Upload single file to Cloudinary
    const result = await uploadToCloudinary(
      req.file.buffer,
      "oscrovilla/verification"
    );

    const escortDoc = EscortModel.findByIdAndUpdate(
      req.user.id,
      { verificationImg: result.secure_url },
      { new: true, runValidators: true }
    );

    if (!escortDoc) {
      return res.status(404).json({ message: "Escort not found" });
    }

    res.status(201).json({
      message: "Verification image uploaded successfully",
      verificationImg: escortDoc.verificationImg,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Verification upload failed" });
  }
};

module.exports = { escortVerificationImage };
