const EscortModel = require("../../../models/Escort");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

            // Create tokens
        const accessToken = jwt.sign(
          { id: userDoc._id, userType: "escort" },
          process.env.JWT_ACCESS_SECRET,
          { expiresIn: "15m" }
        );
    
        const refreshToken = jwt.sign(
          { id: userDoc._id, userType: "escort" },
          process.env.JWT_REFRESH_SECRET,
          { expiresIn: "7d" }
        );
    
        // // Save refresh token in DB
        // escort.refreshToken = refreshToken;
        // await escort.save();
    
        // Send refresh token in HttpOnly cookie
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
          path: "/",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        userDoc.refreshToken =  refreshToken
        await userDoc.save()

    return res.status(201).json({
      message:
        // "User registered successfully check your email to verify your account",
        "User registered successfully",
        user: userDoc,
        accessToken
    },);
  } catch (error) {
    console.error("Error during registration:", error);
    return res
      .status(500)
      .json({ message: "An error occurred during registration" });
  }
};

module.exports = { escortRegister };
