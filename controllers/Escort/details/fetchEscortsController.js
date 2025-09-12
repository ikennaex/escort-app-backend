const EscortModel = require("../../../models/Escort");

const getEscorts = async (req, res) => {
  try {
    // get page and limit from query params (?page=1&limit=10)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    // filtering
    const filter = {};
    if (req.query.location) {
      filter.location = req.query.location; // exact match
    }
    if (req.query.category) {
      filter.category = req.query.category; // exact match
    }
    if (req.query.name) {
      // partial match (case insensitive search)
      filter.name = { $regex: req.query.name, $options: "i" };
    }

    const escortDoc = await EscortModel.find().skip(skip).limit(limit);

    // get total count (for frontend to know how many pages exist)
    const total = await EscortModel.countDocuments();
    res.status(200).json({
      escortDoc,
      page,
      totalPages: Math.ceil(total / limit),
      totalEscorts: total,
    });
  } catch (err) {
    console.error("Error fetching escorts:", err);
    res.status(500).json({ message: "Failed to fetch escorts" });
  }
};

module.exports = { getEscorts };
