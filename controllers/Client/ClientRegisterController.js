const ClientModel = require("../../models/Client");
const bcrypt = require("bcrypt");

const clientRegister = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if email already exists in client
    const emailExistsInClient = await ClientModel.findOne({ email });
    if (emailExistsInClient) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // check if email already exists in EscortModel
    const emailExistsInEscort = await EscortModel.findOne({ email });
    if (emailExistsInEscort) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashPass = await bcrypt.hash(password, 10);
    const userDoc = await ClientModel.create({
      email,
      password: hashPass,
    });

    res.json({ message: "Client registered successfully", userDoc });
  } catch (error) {
    console.error("Error during client registration:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { clientRegister };
