const { default: mongoose } = require("mongoose");
const EscortModel = require("../../../models/Escort");
const SubscriptionModel = require("../../../models/Subscription");

const deleteProfile = async (req, res) => {
  try {
    const escortId = req.user.id;
    await EscortModel.findByIdAndDelete(escortId);

    // Remove orphaned subscriptions
    await SubscriptionModel.deleteMany({ user: new mongoose.Types.ObjectId(escortId) });

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An Error occured while trying to delete the profile" });
  }
};

module.exports = { deleteProfile };
