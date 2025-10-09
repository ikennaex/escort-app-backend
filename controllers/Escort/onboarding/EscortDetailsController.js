const EscortModel = require("../../../models/Escort");

const escortDetails = async (req, res) => {
  try {
    const {
      education,
      about,
      occupation,
      ethnicity,
      bustSize,
      height,
      weight,
      bodyBuild,
      looks,
      smoker,
      sexualOrientation,
      incallAvailable,
      outcallAvailable,
    } = req.body;

    const detailsDoc = await EscortModel.findByIdAndUpdate(req.user.id, {
      education,
      about,
      occupation,
      ethnicity,
      bustSize,
      height,
      weight,
      bodyBuild,
      looks,
      smoker,
      sexualOrientation,
      incallAvailable,
      outcallAvailable,
      registrationStep: "services" // update registration step
    },{ new: true, runValidators: true });

    res.status(201).json({ message: "Details added successfully", detailsDoc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Details Upload Failed" });
  }
};

module.exports = { escortDetails };
