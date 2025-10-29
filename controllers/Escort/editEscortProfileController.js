const EscortModel = require("../../models/Escort");

const editProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const formData = req.body;
    const escortDoc = await EscortModel.findByIdAndUpdate(
      id,
      { $set: formData },
      { new: true, runValidators: true }
    );

    if (!escortDoc) {
      return res.status(404).json({ message: "Escort not found" });
    }

    res.status(200).json({ message: "Record updated successfully", escortDoc });
  } catch (err) {
    console.error(err)
    res.status(500).json({message: "Could not update escort record", error:err.message})
  }
};

const editLocation = async (req, res) => {
  try {
    const id = req.user.id;
    const formData = req.body;

    const escortDoc = await EscortModel.findByIdAndUpdate(
      id,
      { $set: formData },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Location updated successfully", escortDoc });
  } catch (err) {
    console.error(err)
    res.status(500).json({message: "Could not update location", error:err.message})
  }
}

module.exports = {editProfile, editLocation};
