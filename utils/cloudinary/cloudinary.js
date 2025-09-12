// import { v2 as cloudinary } from "cloudinary";
const streamifier = require("streamifier");
const cloudinary = require("../../config/cloudinary")


const uploadToCloudinary = async (fileBuffer, folder = "uploads") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

module.exports = uploadToCloudinary;
