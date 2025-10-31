const streamifier = require("streamifier");
const sharp = require("sharp"); // Add this
const cloudinary = require("../../config/cloudinary");

const uploadToCloudinary = async (fileBuffer, folder = "uploads") => {
  return new Promise(async (resolve, reject) => {
    try {
      // 1. Resize and compress the image buffer before upload
      const resizedBuffer = await sharp(fileBuffer)
        .resize({ width: 1200 }) // reduce width (adjust as needed)
        .jpeg({ quality: 80 })   // compress quality to 80%
        .toBuffer();

      // 2. Create Cloudinary upload stream
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          transformation: [
            {
              overlay: {
                font_family: "Arial",
                font_size: 100,
                font_weight: "bold",
                text: "www.oscrovilla.com",
              },
              color: "#000000",
              opacity: 50,
              gravity: "center",
            },
            { angle: -45 },
            { flags: "layer_apply" },
          ],
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      // 3. Pipe the resized buffer instead of original
      streamifier.createReadStream(resizedBuffer).pipe(uploadStream);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = uploadToCloudinary;
