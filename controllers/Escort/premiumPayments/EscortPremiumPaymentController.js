const ReceiptModel = require("../../../models/Receipt");
const uploadToCloudinary = require("../../../utils/cloudinary/cloudinary");
const sendPaymentMail = require("../../../utils/emails/paymentEmail");

const postPremiumReceipt = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Receipt file is required" });
    }

    const { amount, plan, paymentMethod } = req.body;

    const result = await uploadToCloudinary(
      req.file.buffer,
      "oscrovilla/receipts"
    );

    // for setting the number of days in the receipt model
    const durationMap = {
      weekly: 7,
      biweekly: 14,
      monthly: 30,
      quarterly: 90,
      "semi-annually": 180,
      annually: 365,
    };
    const days = durationMap[plan];

    const receiptDoc = await ReceiptModel.create({
      user: req.user.id,
      plan,
      amount,
      startDate: new Date(),
      endDate: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
      transactionRef: null,
      paymentMethod,
      receipt: result.secure_url,
    });

    await sendPaymentMail(amount, plan);
    return res
      .status(201)
      .json({ message: "Receipt uploaded successfully", receipt: receiptDoc });
  } catch (err) {
    console.error("Error uploading receipt:", err);
    return res.status(500).json({ message: "Error uploading receipt" });
  }
};



module.exports = { postPremiumReceipt };