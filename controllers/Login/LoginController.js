const EscortModel = require("../../models/Escort");
const ClientModel = require("../../models/Client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { identifier, password } = req.body;

  let user = await EscortModel.findOne({ $or: [{ email: identifier }, { username: identifier }] }).select("+password");
  let userType = "escort";

  if (!user) {
    user = await ClientModel.findOne({ $or: [{ email: identifier }, { username: identifier }] });
    userType = "client";
  }

  if (!user) return res.status(404).json({ message: "Email or Username not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Incorrect Password" });

  const accessToken = jwt.sign(
    { id: user._id, userType },  // userType added to payload
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" }
  );

  res.json({ message: "Login successful", accessToken, userType });
};


const logout = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      const user = await UserModel.findById(decoded.id);
      if (user) {
        user.refreshToken = null; // clear from DB
        await user.save();
      }
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      path: "/",
    });

    res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Logout failed" });
  }
};


module.exports = { login, logout };