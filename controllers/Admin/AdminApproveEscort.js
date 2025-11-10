const EscortModel = require("../../models/Escort");

const approveEscort = async (req, res) => {
  try {
    const { id } = req.params;

    // update only isActive field
    const escortDoc = await EscortModel.findByIdAndUpdate(
      id,
      { isActive: true },
      { new: true }
    );

    if (!escortDoc) {
      return res.status(404).json({ message: "Escort not found" });
    }

    res
      .status(200)
      .json({ message: "Escort approved successfully", escort: escortDoc });
  } catch (err) {
    console.error("Error approving escort:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const rejectEscort = async (req, res) => {
  try {
    const { id } = req.params;

    const escort = await EscortModel.findByIdAndDelete(id);
    if (!escort) {
      return res.status(404).json({ message: "Escort not found" });
    }

    res
      .status(200)
      .json({ message: "Escort rejected successfully", escort });
  } catch (err) {
    console.error("Error rejecting escort:", err);
    res.status(500).json({ message: "Error rejecting escort" });
  }
};

module.exports = { approveEscort, rejectEscort };
