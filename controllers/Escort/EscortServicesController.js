const EscortModel = require("../../models/Escort");

const escortServices = async (req, res) => {
  try {
    const {services} = req.body
    const servicesDoc = await EscortModel.findByIdAndUpdate(
      req.user.id,
      { $set: { services } },
      { new: true, runValidators: true } 
    );

    res.status(201).json({ message: "Services added successfully", servicesDoc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Services Upload Failed" });
  }
};

module.exports = { escortServices };
