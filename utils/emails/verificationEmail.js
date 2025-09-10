const transporter = require("./transporter");
require('dotenv').config();

const sendVerificationMail = async (to, otp, username) => {
  return transporter.sendMail({
    from: `"OscroVilla" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Verify Your Email",
    html: `
      <h2>Welcome ${username}!</h2>
      <p>Please use the OTP below to verify your email:</p>
      <h3>${otp}</h3>
      <br/><br/>
      <small>This OTP expires in 20 minutes.</small>
    `,
  });
};

module.exports = sendVerificationMail;
