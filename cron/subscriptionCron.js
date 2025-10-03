const cron = require("node-cron");
const Subscription = require("../models/Subscription");
const Escort = require("../models/Escort");

const startSubscriptionCron = () => {
  // Runs every midnight
  cron.schedule("0 0 * * *", async () => {
    const now = new Date();
    try {
      // Step 1: Find all expired subscriptions
      const expiredSubs = await Subscription.find({
        endDate: { $lte: now },
        status: "active",
      });

      // Step 2: Mark these subscriptions as expired
      await Subscription.updateMany(
        { endDate: { $lte: now }, status: "active" },
        { $set: { status: "expired" } }
      );

      // Step 3: Remove premium from escorts linked to these subscriptions
      const escortIds = expiredSubs.map((sub) => sub.user);
      if (escortIds.length > 0) {
        await Escort.updateMany(
          { _id: { $in: escortIds }, premium: true },
          { $set: { premium: false } }
        );
      }

      console.log("Expired subscriptions updated and escorts downgraded");
    } catch (err) {
      console.error("Error updating subscriptions:", err);
    }
  });
};

module.exports = startSubscriptionCron;
