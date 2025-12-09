const EscortModel = require("../../models/Escort");
const ClientModel = require("../../models/Client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { identifier, password } = req.body;

  let user = await EscortModel.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  }).select("+password");
  let userType = "escort";

  if (!user) {
    user = await ClientModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    }).select("+password");
    userType = "client";
  }

  if (!user)
    return res.status(404).json({ message: "Email or Username not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Incorrect Password" });

  const accessToken = jwt.sign(
    { id: user._id, userType }, // userType added to payload
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { id: user._id, userType },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  // Save refresh token in DB
  user.lastLogin = new Date();
  user.refreshToken = refreshToken; // if user is escort saves in escort model, if user is client saves in client model
  await user.save();

  // Send refresh token in HttpOnly cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  const safeUser = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: userType,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  res.json({
    message: "Login successful",
    accessToken,
    // userType,
    user: safeUser,
  });
};

const logout = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

        let user = await EscortModel.findById(decoded.id);
        if (!user) {
          user = await ClientModel.findById(decoded.id);
        }

        if (user) {
          user.refreshToken = null; // clear refresh token from DB
          await user.save();
        }
      } catch (err) {
        console.warn(
          "Invalid or expired refresh token during logout:",
          err.message
        );
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
