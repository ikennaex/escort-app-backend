const transporter = require("./transporter");
require("dotenv").config();

const sendApprovedPaymentMail = async (to, username, plan, amount) => {
  try {
    await transporter.sendMail({
      from: `"Oscro Villa" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Payment Approved - Premium Plan Activated",
      html: `
        <h2>Hi ${username},</h2>
        <p>We’re excited to inform you that your payment has been successfully verified!</p>
        <p><strong>Plan:</strong> ${plan}</p>
        <p><strong>Amount:</strong> ₦${Number(amount).toLocaleString()}</p>
        <br/>
        <p>Your premium plan is now active. You can start enjoying all premium features immediately.</p>
        <br/>
        <p>Thank you for choosing Oscro Villa.</p>
        <br/>
        <p style="color: #888; font-size: 12px;">This is an automated message from Oscro Villa. Please do not reply to this email.</p>
      `,
    });
    console.log("Approved payment email sent to user.");
  } catch (error) {
    console.error("Error sending approved payment email:", error);
  }
};

module.exports = sendApprovedPaymentMail;
