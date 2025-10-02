const cron = require("node-cron");
const Subscription = require("../models/Subscription");

const startSubscriptionCron = () => {
  // Runs every midnight
  cron.schedule("0 0 * * *", async () => {
    const now = new Date();
    try {
      await Subscription.updateMany(
        { endDate: { $lte: now }, status: "active" },
        { $set: { status: "expired" } }
      );
      console.log("Expired subscriptions updated");
    } catch (err) {
      console.error("Error updating subscriptions:", err);
    }
  });
};

module.exports = startSubscriptionCron;
