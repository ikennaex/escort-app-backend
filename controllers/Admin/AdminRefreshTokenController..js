const jwt = require("jsonwebtoken");
const AdminModel = require("../../models/Admin");

const adminRefreshTokenHandler = async (req, res) => {
  try {
    const token = req.cookies.adminRefreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const admin = await AdminModel.findById(decoded.id).select("+refreshToken");

    if (!admin || admin.refreshToken !== token) {
      return res.status(403).json({ message: "Refresh token mismatch" }); 
    }

    const newAccessToken = jwt.sign(
      { id: admin._id, email: admin.email, userType: "Admin" },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ adminAccessToken: newAccessToken });
  } catch (err) {
    console.error("Refresh error:", err);
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

module.exports ={adminRefreshTokenHandler}