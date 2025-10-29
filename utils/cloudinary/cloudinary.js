// import { v2 as cloudinary } from "cloudinary";
const streamifier = require("streamifier");
const cloudinary = require("../../config/cloudinary");

const uploadToCloudinary = async (fileBuffer, folder = "uploads") => {
  return new Promise((resolve, reject) => {
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
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

module.exports = uploadToCloudinary;
