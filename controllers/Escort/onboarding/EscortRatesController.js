const EscortModel = require("../../../models/Escort");

const escortRates = async (req, res) => {
  try {
    const {
      shortimeIncall,
      overnightIncall,
      weekendIncall,
      shortimeOutcall,
      overnightOutcall,
      weekendOutcall,
    } = req.body;

    const ratesDoc = await EscortModel.findByIdAndUpdate(
      req.user.id,
      {
        shortimeIncall,
        overnightIncall,
        weekendIncall,
        shortimeOutcall,
        overnightOutcall,
        weekendOutcall,
      },
      { new: true, runValidators: true }
    );

    res.status(201).json({ message: "Rates added successfully", ratesDoc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Rates Upload Failed" });
  }
};

module.exports = { escortRates };
