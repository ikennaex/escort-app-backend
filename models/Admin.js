const mongooose = require("mongoose");
const { Schema } = mongooose;

const AdminSchema = new Schema({
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true, select: false },
  refreshToken: { type: String, select: false },
}, { timestamps: true });

const AdminModel = mongooose.model("Admin", AdminSchema);
module.exports = AdminModel; 