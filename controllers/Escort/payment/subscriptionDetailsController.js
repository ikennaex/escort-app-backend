const { default: mongoose } = require("mongoose");
const SubscriptionModel = require("../../../models/Subscription");

const getSubcriptionDetails = async (req, res) => {
  try {
    const { id } = req.user;
    const subscriptionDoc = await SubscriptionModel.findOne({
      user: new mongoose.Types.ObjectId(id),
    }).sort({ endDate: -1 });
    return res.status(200).json(subscriptionDoc);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getSubcriptionDetails };
