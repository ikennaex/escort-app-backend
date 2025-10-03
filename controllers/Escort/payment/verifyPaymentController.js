const EscortModel = require("../../../models/Escort");
const SubscriptionModel = require("../../../models/Subscription");
const axios = require("axios");

const verifyPayment = async (req, res) => {
  const { id } = req.user;
  try {
    const { reference, plan, amount } = req.body;

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, // your secret key
        },
      }
    ); 

    const data = response.data;

    if (data.status && data.data.status === "success") {
      const escortDoc = await EscortModel.findById(id);

      if (!escortDoc) {
        return res.status(404).json({ message: "Escort not found" });
      }

      // for setting the number of days in the subs model 

      const durationMap = {
        weekly: 7,
        biweekly: 14,
        monthly: 30,
        quarterly: 90,
        "semi-annually": 180,
        annually: 365,
      };

      const days = durationMap[plan];

      const subscription = await SubscriptionModel.create({
        user: id,
        plan,
        startDate: new Date(),
        endDate: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
        transactionRef: reference,
        amount,
      });

      const escort = await EscortModel.findByIdAndUpdate(id, { premium: true }, { new: true });

      return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        payment: data.data,
        subscription,
      });

    } else {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
        data: data.data,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "An error occurred while verifying payment",
    });
  }
};

module.exports = { verifyPayment };
