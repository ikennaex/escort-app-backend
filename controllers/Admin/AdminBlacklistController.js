const EscortModel = require("../../models/Escort.js");
const BlacklistModel = require("../../models/Blacklist.js");

const blacklistEscort = async (req, res) => {
  try {
    const { escortId, reason, details, proof } = req.body;

    // Optional: check if escort already blacklisted
    const existing = await BlacklistModel.findOne({ escort: escortId });
    if (existing) {
      return res.status(400).json({ message: "Escort already blacklisted" });
    }

    // Create new blacklist record
    const blacklistEntry = await BlacklistModel.create({
      escort: escortId,
      reason,
      details,
      proof
    });

    // Optional: update escort model to mark as blacklisted
    await EscortModel.findByIdAndUpdate(escortId, { isBlacklisted: true });

    res.status(201).json({
      message: "Escort successfully blacklisted",
      blacklistEntry,
    });
  } catch (error) {
    console.error("Error blacklisting escort:", error);
    res.status(500).json({ message: "Error blacklisting escort", error });
  }
};

const getBlacklistedEscorts = async (req, res) => {
  try {
    const blacklists = await BlacklistModel.find().populate("escort", "name city state username verificationImage").sort({ createdAt: -1 });
    res.status(200).json({ blacklists });
  } catch (err) {
    console.error("Error fetching blacklists:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch blacklists", error: err.message });
  }
}

module.exports = { blacklistEscort, getBlacklistedEscorts };
