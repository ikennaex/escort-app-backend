const EscortModel = require("../../../models/Escort");
const SubscriptionModel = require("../../../models/Subscription");

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

    const escortDoc = await EscortModel.find({ isActive: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

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

const getPremiumEscorts = async (req, res) => {
  try {
    // get page and limit from query params (?page=1&limit=30)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 30;

    const skip = (page - 1) * limit;

    const escortDoc = await SubscriptionModel.find({ status: "active" })
      .populate("user")
      .sort({ endDate: -1 })
      .skip(skip)
      .limit(limit);

    // get total count (for frontend to know how many pages exist)
    const total = await EscortModel.countDocuments({
      isActive: true,
      premium: true,
    });
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

const getEscortsById = async (req, res) => {
  const { id } = req.params;

  try {
    const escortDoc = await EscortModel.findOne({ _id: id, isActive: true });

    if (!escortDoc) {
      return res.status(404).json({ message: "Escort not found" });
    }

    res.status(200).json(escortDoc);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error getting escort details", err: err.message });
  }
};

// fetch filtered escorts
const filteredEscort = async (req, res) => {
  try {
    const filters = req.query;
    const query = {};

    if (filters.displayName) {
      query.displayName = { $regex: filters.displayName, $options: "i" }; // case-insensitive search
    }
    if (filters.minAge && filters.maxAge) {
      const today = new Date();

      const minDOB = new Date(
        today.getFullYear() - filters.maxAge,
        today.getMonth(),
        today.getDate()
      );

      console.log(minDOB);

      const maxDOB = new Date(
        today.getFullYear() - filters.minAge,
        today.getMonth(),
        today.getDate()
      );

      query.dob = { $gte: minDOB, $lte: maxDOB };
    }
    if (filters.country) query.country = filters.country;
    if (filters.state) query.state = filters.state;
    if (filters.city) query.city = filters.city;
    if (filters.gender) query.gender = filters.gender;
    if (filters.age) query.age = Number(filters.age);
    if (filters.ethnicity) query.ethnicity = filters.ethnicity;
    if (filters.bustSize) query.bustSize = filters.bustSize;
    if (filters.bodyBuild) query.bodyBuild = filters.bodyBuild;
    if (filters.looks) query.looks = filters.looks;
    if (filters.sexualOrientation)
      query.sexualOrientation = filters.sexualOrientation;
    if (filters.availability) query.availability = filters.availability;
    if (filters.smoker) query.smoker = filters.smoker;

    // Services (must include ALL selected)
    if (filters.services) {
      const services = Array.isArray(filters.services)
        ? filters.services
        : [filters.services];
      query.services = { $all: services };
    }

    // only active profile should be returned
    query.isActive = true;

    const escortsDoc = await EscortModel.find(query).sort({ createdAt: -1 });
    res.status(200).json(escortsDoc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching escorts" });
  }
};

module.exports = {
  getEscorts,
  getEscortsById,
  filteredEscort,
  getPremiumEscorts,
};
