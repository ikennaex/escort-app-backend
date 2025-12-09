const cron = require("node-cron");
const EscortModel = require("../models/Escort"); // adjust path\/

const startIncompleteRegistrationCron = () => {
  // Runs every day at midnight
  cron.schedule("0 0 * * *", async () => {
    try {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); // 7 days ago

      // Find incomplete registrations older than 7 days 
      const incompleteEscorts = await EscortModel.find({
        registrationComplete: false,
        createdAt: { $lte: oneWeekAgo },
      });

      if (incompleteEscorts.length === 0) {
        console.log("No incomplete registrations to delete.");
        return;
      }

      // Collect IDs for deletion
      const escortIds = incompleteEscorts.map((escort) => escort._id);

      // OPTIONAL: delete images from Cloudinary before deletion
      const cloudinary = require("cloudinary").v2;

      for (const escort of incompleteEscorts) {
        if (escort.gallery && escort.gallery.length > 0) {
          const imagesToDelete = escort.gallery.map((imgUrl) => {
            const publicId = imgUrl
              .split("/")
              .slice(-2)
              .join("/")
              .split(".")[0];
            return publicId.startsWith("oscrovilla/")
              ? publicId
              : `oscrovilla/${publicId}`;
          });

          // Delete all gallery images in parallel
          await Promise.all(
            imagesToDelete.map((id) => cloudinary.uploader.destroy(id))
          );
        }
      }

      // Delete incomplete profiles
      await EscortModel.deleteMany({ _id: { $in: escortIds } });

      console.log(`Deleted ${escortIds.length} incomplete escort profiles.`);
    } catch (err) {
      console.error("Error cleaning up incomplete registrations:", err);
    }
  });
};

module.exports = startIncompleteRegistrationCron;
