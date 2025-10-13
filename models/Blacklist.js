const mongoose = require("mongoose");
const { Schema } = mongoose;

const BlacklistSchema = new Schema(
  {
    escort: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Escort",
      required: true,
    },
    reason: { type: String, required: true},
    details: { type: String, required: true},
    images: { type: [String] }
  },
  { timestamps: true }
);

const BlacklistModel = mongoose.model("BlackList", BlacklistSchema);
module.exports = BlacklistModel;
