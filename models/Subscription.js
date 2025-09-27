const mongoose = require("mongoose");
const {Schema} = mongoose

const SubscriptionSchema = new Schema(
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
    status: {
      type: String,
      enum: ["active", "expired", "cancelled"],
      default: "active",
    },
    transactionRef: {
      type: String,
      required: true, // Paystack reference
    },
    amount: {
      type: Number,
      required: true, // Amount paid in NGN
    },
  },
  { timestamps: true }
);

const SubscriptionModel = mongoose.model("Subscription", SubscriptionSchema);
module.exports = SubscriptionModel;