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

    const escortDoc = await EscortModel.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          verificationImage: result.secure_url,
          registrationComplete: true,
          registrationStep: null,
        },
      },
      { new: true, runValidators: true }
    );

    if (!escortDoc) {
      return res.status(404).json({ message: "Escort not found" });
    }

    res.status(201).json({
      message:
        "Verification image uploaded successfully, registration complete",
      verificationImg: escortDoc.verificationImage,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Verification upload failed, try again" });
  }
};

module.exports = { escortVerificationImage };
