const transporter = require("./transporter");
require("dotenv").config();

const sendRejectedPaymentMail = async (email, plan, amount, reason) => {
  try {
    await transporter.sendMail({
      from: `"Oscro Villa" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Payment Rejected - Oscro Villa",
      html: `
        <h2 style="color: #d9534f;">Payment Rejected</h2>
        <p>We regret to inform you that your payment for the following plan has been rejected:</p>
        <p><strong>Plan:</strong> ${plan}</p>
        <p><strong>Amount:</strong> ₦${Number(amount).toLocaleString()}</p>
        ${
          reason
            ? `<p><strong>Reason:</strong> ${reason}</p>`
            : `<p>Please contact support for more information.</p>`
        }
        <br/>
        <p>If you believe this was a mistake, please re-upload your receipt or reach out to our support team for assistance.</p>
        <br/>
        <p style="color: #888; font-size: 12px;">This is an automated message from Oscro Villa.</p>
      `,
    });

    console.log("Rejected payment email sent to user.");
  } catch (error) {
    console.error("Error sending rejected payment email:", error);
  }
};

module.exports = sendRejectedPaymentMail;
