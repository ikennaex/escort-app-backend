const EscortModel = require("../../models/Escort");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendVerificationMail = require("../../utils/emails/verificationEmail");

const escortRegister = async (req, res) => {
  try {
    const {
      username,
      email,
      phoneNumber,
      password,
      displayName,
      country,
      state,
      city,
      dob,
      gender,
      heading,
    } = req.body;

    // check if username or email already exists
    const usernameExists = await EscortModel.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // check if email already exists
    const emailExists = await EscortModel.findOne({ email }); 
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
    const otp = crypto.randomInt(1000, 9999).toString();

    const userDoc = await EscortModel.create({
      username,
      email,
      phoneNumber,
      password: hashPass,
      displayName,
      country,
      state,
      city,
      dob,
      gender,
      heading,
      otp,
      otpExpires: Date.now() + 20 * 60 * 1000, // 20 minutes
      isVerified: false,
    });

    await sendVerificationMail(email, otp, username);

    return res.status(201).json({
      message:
        "User registered successfully check your email to verify your account",
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res
      .status(500)
      .json({ message: "An error occurred during registration" });
  }
};

module.exports = { escortRegister };

// sH9lcfFJsuKB02B4
// ikennaexcel_db_user
