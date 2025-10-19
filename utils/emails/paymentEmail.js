const transporter = require("./transporter");
require("dotenv").config();

const sendPaymentMail = async ( amount, plan) => {
  try {
    await transporter.sendMail({
      from: `"Oscro Villa" <${process.env.EMAIL_USER}>`,
      to: "oscrovilla@gmail.com",
      subject: "New Payment Request Submitted",
      html: `
        <h2>New Payment Request</h2>
        <p><strong>Plan:</strong> ${plan}</p>
        <p><strong>Amount:</strong> ₦${Number(amount).toLocaleString()}</p>
        <br/>
        <p>A new payment receipt has been uploaded for review.</p>
        <p>Login to your admin dashboard to verify and approve the request.</p>
        <br/>
        <p style="color: #888; font-size: 12px;">This is an automated message from Oscro Villa.</p>
      `,
    });
    console.log("Payment notification email sent to admin.");
  } catch (error) {
    console.error("Error sending payment email:", error);
  }
};

module.exports = sendPaymentMail;
