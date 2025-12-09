const { default: mongoose } = require("mongoose");
const EscortModel = require("../../../models/Escort");
const SubscriptionModel = require("../../../models/Subscription");

const deleteProfile = async (req, res) => {
  try {
    const escortId = req.user.id;

    const escort = await EscortModel.findById(escortId);
    if (!escort) {
      return res.status(404).json({ message: "Profile not found" });
    }


    // DELETE IMAGES 
    const imagesToDelete = [];

    // Add profile image
    if (escort.profileImagePublicId) {
      imagesToDelete.push(escort.profileImagePublicId);
    }

    // Add gallery images
    if (escort.gallery && escort.gallery.length > 0) {
      escort.gallery.forEach((imgUrl) => {
        const publicId = imgUrl.split("/").slice(-2).join("/").split(".")[0];
        imagesToDelete.push(
          publicId.startsWith("oscrovilla/")
            ? publicId
            : `oscrovilla/${publicId}`
        );
      });
    }

    // Delete all images in parallel
    try {
      await Promise.all(
        imagesToDelete.map((id) => cloudinary.uploader.destroy(id))
      );
    } catch (cloudErr) {
      console.error("Error deleting images from Cloudinary:", cloudErr);
      // optional: continue even if some images fail
    }

    await EscortModel.findByIdAndUpdate(escortId, {
      isDeleted: true,
      deletedAt: new Date(),
    });

    // Remove orphaned subscriptions
    await SubscriptionModel.updateMany(
      { user: escortId },
      {
        $set: {
          status: "cancelled",
          cancelledAt: new Date(),
        },
      }
    );

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An Error occured while trying to delete the profile" });
  }
};

module.exports = { deleteProfile };
