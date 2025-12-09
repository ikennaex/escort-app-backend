const jwt = require("jsonwebtoken");
const EscortModel = require("../models/Escort");
const ClientModel = require("../models/Client");

const refreshTokenHandler = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    let user;
    if (decoded.userType === "escort") {
      user = await EscortModel.findById(decoded.id).select("+refreshToken");
    } else if (decoded.userType === "client") {
      user = await ClientModel.findById(decoded.id).select("+refreshToken");
    }

    if (!user || user.refreshToken !== token) {
      return res.status(403).json({ message: "Refresh token mismatch" });
    }

    const newAccessToken = jwt.sign(
      { id: user._id, userType: decoded.userType },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("Refresh error:", err);
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

module.exports = { refreshTokenHandler };
