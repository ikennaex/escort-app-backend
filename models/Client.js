const mongooose = require("mongoose");
const { Schema } = mongooose;

const clientSchema = new Schema({
  username: { type: String, unique: true, index: true },
  email: { type: String, required: true, unique: true, index: true },
  phoneNumber: { type: String, unique: true, index: true },
  password: { type: String, required: true, select: false },
}, { timestamps: true });

const ClientModel = mongooose.model("Client", clientSchema);
module.exports = ClientModel;