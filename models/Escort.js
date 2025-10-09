const mongoose = require("mongoose");
const { Schema } = mongoose;

const EscortSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true, index: true, select: false },
    phoneNumber: { type: String, required: true, unique: true, index: true },
    displayName: { type: String, required: true },
    country: { type: String, required: true },
    countryCode: { type: Number, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    heading: { type: String, required: true },
    education: { type: String },
    about: { type: String },
    occupation: { type: String },
    ethnicity: { type: String },
    bustSize: { type: String },
    height: { type: String },
    weight: { type: String },
    bodyBuild: { type: String },
    looks: { type: String },
    smoker: { type: String, enum: ["Yes", "No"] },
    sexualOrientation: { type: String },
    incallAvailable: { type: String, enum: ["Yes", "No"] },
    outcallAvailable: { type: String, enum: ["Yes", "No"] },
    language: { type: String },
    services: { type: [String] },
    shortimeIncall: { type: Number },
    overnightIncall: { type: Number },
    weekendIncall: { type: Number },
    shortimeOutcall: { type: Number },
    overnightOutcall: { type: Number },
    weekendOutcall: { type: Number },
    gallery: { type: [String] },
    bankDetails: {
      bankName: { type: String, required: false, select: false},
      accountName: { type: String, required: false, select: false },
      accountNumber: { type: String, required: false, select: false },
    },
    premium: { type: Boolean, default:false },
    verificationImage: { type: String, select:false },
    refreshToken: { type: String, select: false },
    otp: { type: String },
    otpExpires: { type: Date },
    isVerified: { type: Boolean, default: false }, // to track if email/phone is verified
    registrationComplete: { type: Boolean, default: false }, // to track if all registration is complete
    isActive: { type: Boolean, default: false }, // to track if the profile is active ie all details added
    lastLogin: { type: Date, default: null },
    views: { type: Number, default: 0 },
    registrationStep: { type: String, default: "additionalDetails" }
  },
  { timestamps: true }
);

const EscortModel = mongoose.model("Escort", EscortSchema);
module.exports = EscortModel;
