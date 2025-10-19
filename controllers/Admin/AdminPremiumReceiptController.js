const ReceiptModel = require("../../models/Receipt");

const getPremiumReceipts = async (req, res) => {
    try {
        const receipts = await ReceiptModel.find({status: "pending"}).populate("user").sort({ createdAt: -1 });
        return res.status(200).json({ receipts });
    } catch (err) {
        console.error("Error fetching receipts:", err);
        return res.status(500).json({ message: "Error fetching receipts" });
    }
}
module.exports = { getPremiumReceipts };