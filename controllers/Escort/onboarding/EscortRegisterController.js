const EscortModel = require("../../../models/Escort");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendVerificationMail = require("../../../utils/emails/verificationEmail");

const escortRegister = async (req, res) => {
  try {
    const {
      username,
      email,
      phoneNumber,
      password,
      displayName,
      country,
      countryCode,
      state,
      city,
      dob,
      gender,
      heading,
    } = req.body;

    if (!username || !email || !phoneNumber || !password) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    // 2. Normalize email & username
    const normalizedEmail = email.toLowerCase().trim();
    const normalizedUsername = username.trim();

    // check if username or email already exists
    const usernameExists = await EscortModel.findOne({ username:normalizedUsername });
    if (usernameExists) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // check if email already exists
    const emailExists = await EscortModel.findOne({ email: normalizedEmail });
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // check if phone number already exists
    const phoneNumberExists = await EscortModel.findOne({ phoneNumber });
    if (phoneNumberExists) {
      return res.status(400).json({ message: "Phone number already exists" });
    }
    // password hash
    const hashPass = await bcrypt.hash(password, 10);

    // generate OTP (4-digit code)
    // const otp = crypto.randomInt(1000, 9999).toString();  // remove later

    // await sendVerificationMail(email, otp, username); // remove later

    const userDoc = await EscortModel.create({
      username:normalizedUsername,
      email: normalizedEmail,
      phoneNumber,
      password: hashPass,
      displayName,
      country,
      countryCode,
      state,
      city,
      dob,
      gender,
      heading,
      // otp,
      // otpExpires: Date.now() + 20 * 60 * 1000, // 20 minutes
      isVerified: true,
    });

    return res.status(201).json({
      message:
        // "User registered successfully check your email to verify your account",
        "User registered successfully",
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res
      .status(500)
      .json({ message: "An error occurred during registration" });
  }
};

module.exports = { escortRegister };
