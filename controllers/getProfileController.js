const EscortModel = require("../models/Escort");

const getLoggedUserProfile = async (req, res) => {
  try {
    const user = await EscortModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password, ...safeUser } = user.toObject();
    res.status(200).json(safeUser);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Error fetching user profile" });
  }
};

module.exports = {getLoggedUserProfile}