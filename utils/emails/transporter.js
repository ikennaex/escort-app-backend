const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",       // Zoho SMTP server
  port: 465,                   // use 465 for secure SSL
  secure: true,                // true for port 465, false for 587
  auth: {
    user: process.env.EMAIL_USER, // your Zoho email (e.g. "you@yourdomain.com")
    pass: process.env.EMAIL_PASS, // your Zoho app password
  },
});

module.exports = transporter;