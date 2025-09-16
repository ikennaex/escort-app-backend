const EscortModel = require("../../models/Escort");

const postBankDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const bankDetails = req.body;  

    const escortDoc = await EscortModel.findByIdAndUpdate(
      id,
      { $set: bankDetails },
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

const getBankDetails = async (req, res) => {
  try {
    const id = req.user.id;

    // return bankDetails field
    const escort = await EscortModel.findById(id).select("bankDetails");

    if (!escort) {
      return res.status(404).json({ message: "Escort not found" });
    }

    res.status(200).json(escort.bankDetails);
  } catch (err) {
    console.error("Error fetching bank details:", err);
    res.status(500).json({ message: "Error fetching bank details" });
  }
}

module.exports = {postBankDetails, getBankDetails}
