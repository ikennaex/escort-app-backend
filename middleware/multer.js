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
  "application/octet-stream"
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
    fileSize: 50 * 1024 * 1024, // 20 MB max per file
  },
});

// Middleware to wrap multer and handle errors
const handleUpload = (fieldName, maxFiles = 10) => (req, res, next) => {
  upload.array(fieldName, maxFiles)(req, res, (err) => {
    if (err) {
      console.error("Multer error:", err.message);
      return res.status(400).json({ message: err.message }); // clear error for client
    }

    // Optional: log files for debugging mobile uploads
    console.log("Files received:", req.files.map(f => ({
      originalName: f.originalname,
      mimetype: f.mimetype,
      size: f.size
    })));

    next(); // proceed to controller if no errors
  });
};

module.exports = {handleUpload, upload};

// module.exports = upload;
