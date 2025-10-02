const EscortModel = require("../../../models/Escort");

const checkUserExists = async (req, res) => {
  try {
    const { field, value } = req.query;
    if (!field || !value) {
      return res.status(400).json({ message: "Field and value are required" });
    }

    // whitelist fields to prevent injection
    const allowedFields = ["username", "email", "phoneNumber"];
    if (!allowedFields.includes(field)) {
      return res.status(400).json({ message: "Invalid field" });
    }

    if (field === "email") {
      // validate email format
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(value)) {
        return res.status(400).json({ message: "Invalid email format" });
      }
    }

    const exists = await EscortModel.exists({ [field]: value });
    res.json({ exists: !!exists });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { checkUserExists };
