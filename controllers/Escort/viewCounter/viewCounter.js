const EscortModel = require("../../../models/Escort");

const viewCounter = async (req, res) => {
      try {
    const escort = await EscortModel.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } }, // increment view count by 1
      { new: true }
    );
    if (!escort) return res.status(404).json({ message: "Escort not found" });

    res.json({ message: "View recorded", views: escort.views });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { viewCounter };