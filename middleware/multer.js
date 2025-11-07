const multer = require("multer");

// Use memoryStorage for temporary file storage
const storage = multer.memoryStorage();

// Allowed file types
const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/gif",
  "video/mp4",
  "video/quicktime",
];

// Filter files by MIME type
const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image/video files are allowed!"), false);
  }
};

// Multer configuration
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20 MB max per file
  },
});

module.exports = upload;
