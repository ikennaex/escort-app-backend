const cloudinary = require("../../config/cloudinary");

(async () => {
  try {
    const result = await cloudinary.uploader.upload("../../../client/src/assets/logo.png", {
      public_id: "your_logo",
      folder: "watermarks" 
    });
    console.log("Watermark uploaded:", result.secure_url);
  } catch (err) {
    console.error("Error uploading watermark:", err);
  }
})();