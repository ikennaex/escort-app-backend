const AdminModel = require("../../models/Admin");

const getAdminProfile = async (req, res) => {
  try {
    const admin = await AdminModel.findById(req.user.id);
    console.log("Fetched admin profile:", admin);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" }); 
    }
    res.status(200).json(admin);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Error fetching user profile" });
  }
};

module.exports = { getAdminProfile };
