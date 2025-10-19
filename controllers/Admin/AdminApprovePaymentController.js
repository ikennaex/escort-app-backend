const ReceiptModel = require("../../models/Receipt");
const SubscriptionModel = require("../../models/Subscription");
const sendApprovedPaymentMail = require("../../utils/emails/approvedPaymentMail");
const sendRejectedPaymentMail = require("../../utils/emails/rejectedPaymentMail");

const approvePayment = async (req, res) => {
  try {
    const { receiptId } = req.body;

    const receipt = await ReceiptModel.findById(receiptId).populate("user");
    if (!receipt) {
      return res.status(404).json({ message: "Receipt not found" });
    }

    const subscription = await SubscriptionModel.create({
      user: receipt.user,
      plan: receipt.plan,
      startDate: receipt.startDate,
      endDate: receipt.endDate,
      amount: receipt.amount,
      paymentMethod: receipt.paymentMethod,
    });

    receipt.status = "approved";
    await receipt.save();

    await sendApprovedPaymentMail(
      receipt.user.email,
      receipt.user.username,
      receipt.plan,
      receipt.amount
    );
    return res
      .status(200)
      .json({ message: "Payment approved successfully", subscription });
  } catch (err) {
    console.error("Error approving payment:", err);
    return res.status(500).json({ message: "Error approving payment" });
  }
};

const rejectPayment = async (req, res) => {
  try {
    const { receiptId } = req.body;

    const receipt = await ReceiptModel.findById(receiptId).populate("user");
    if (!receipt) {
      return res.status(404).json({ message: "Receipt not found" });
    }
    receipt.status = "rejected";
    await receipt.save();

    await sendRejectedPaymentMail(
      receipt.user.email,
      receipt.plan,
      receipt.amount,
    );
    return res
      .status(200)
      .json({ message: "Payment rejected successfully" });
  } catch (err) {
    console.error("Error rejecting payment:", err);
    return res.status(500).json({ message: "Error rejecting payment" });
  }
};

module.exports = { approvePayment, rejectPayment };
