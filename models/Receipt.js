const mongoose = require("mongoose");
const {Schema} = mongoose

const ReceiptSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Escort",
      required: true,
    },
    plan: {
      type: String,
      enum: [
        "weekly",
        "biweekly",
        "monthly",
        "quarterly",
        "semi-annually",
        "annually",
      ],
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: true,
    },
    transactionRef: {
      type: String,
      default: null,
      // required: true, // Paystack reference
    },
    amount: {
      type: Number,
      required: true, // Amount paid in NGN
    },
    paymentMethod: {
      type: String,
      required: true, 
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    receipt: {
        type: String,
        required: true,
    }
  },
  { timestamps: true }
);

const ReceiptModel = mongoose.model("Receipt", ReceiptSchema);
module.exports = ReceiptModel;