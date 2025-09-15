const EscortModel = require("../../models/Escort");

const postBankDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const bankDetails = req.body;

    const escortDoc = await EscortModel.findByIdAndUpdate(
      id,
      { $set: formData },
      { new: true, runValidators: true }
    );

    if (!escortDoc) {
      return res.status(404).json({ message: "Escort not found" });
    }
    res.status(201).json({ message: "Bank details updated successfully", escortDoc });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Could not update escort bank record", error: err.message });
  }
};

module.exports = {postBankDetails}
