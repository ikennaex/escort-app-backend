const jwt = require("jsonwebtoken");
const EscortModel = require("../models/Escort");

const verifyEscortOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const escort = await EscortModel.findOne({ email }).select("+password"); 
    if (!escort) return res.status(404).json({ message: "User not found" });

    if (escort.isVerified) {
      return res.status(400).json({ message: "Already verified" });
    }

    if (escort.otp !== otp || escort.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Update escort
    escort.registrationStep = "additionalDetails";
    escort.isVerified = true;
    escort.otp = undefined;
    escort.otpExpires = undefined;

    // Create tokens
    const accessToken = jwt.sign(
      { id: escort._id, userType: "escort" },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: escort._id, userType: "escort" },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // Save refresh token in DB
    escort.refreshToken = refreshToken;
    await escort.save();

    // Send refresh token in HttpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Clean object for response
    const { password, refreshToken: _, ...safeUser } = escort.toObject();

    return res.json({
      message: "OTP verified, registration complete",
      user: safeUser,
      accessToken,
    });

  } catch (err) {
    console.error("Error verifing OTP:", err);
    res.status(500).json({ error: "Erro verifing otp" });
  }
};

module.exports = { verifyEscortOtp };
