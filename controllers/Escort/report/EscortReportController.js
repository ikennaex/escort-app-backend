const ReportModel = require("../../../models/Reports");
const uploadToCloudinary = require("../../../utils/cloudinary/cloudinary");

const postReport = async (req, res) => {
  try {
    const { escortId, reason, details } = req.body;

    if (!escortId || !reason || !details) {
      return res
        .status(400)
        .json({ message: "escortId, reason, and details are required" });
    }

    const uploadedImages = [];
    for (const file of req.files) {
      const result = await uploadToCloudinary(
        file.buffer,
        "oscrovilla/reports"
      );
      uploadedImages.push(result.secure_url);
    }

    const newReport = await ReportModel.create({
      escort: escortId,
      reason,
      details,
      images: uploadedImages,
    });
    res
      .status(201)
      .json({ message: "Report submitted successfully", report: newReport });
  } catch (err) {
    console.error("Error submitting report:", err);
    res
      .status(500)
      .json({ message: "Failed to submit report", error: err.message });
  }
};

const getReports = async (req, res) => {
  try {
    const reports = await ReportModel.find().populate("escort").sort({ createdAt: -1 });;
    res.status(200).json({ reports });
  } catch (err) {
    console.error("Error fetching reports:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch reports", error: err.message });
  }
};

module.exports = { postReport, getReports };
