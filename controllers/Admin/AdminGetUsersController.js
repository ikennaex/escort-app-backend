const ClientModel = require("../../models/Client");
const EscortModel = require("../../models/Escort");

const getAllEscorts = async (req, res) => {
  try {
    const escortDoc = await EscortModel.find();
    res.status(200).json(escortDoc);
  } catch (err) {
    console.error("Error fetching escorts:", err);
    res.status(500).json({ message: "Could not fetch escorts" });
  }
};

const getEscortsById = async (req, res) => {
  const id = req.params.id
  try {
    const escortDoc = await EscortModel.findById(id).select("+verificationImg +bankDetails");
    res.status(200).json(escortDoc);
  } catch (err) {
    console.error("Error fetching escorts:", err);
    res.status(500).json({ message: "Could not fetch escorts" });
  }
};

const getAllVerifiedEscorts = async (req, res) => {
  try {
    const escortDoc = await EscortModel.find({ isActive: true });
    res.status(200).json(escortDoc);
  } catch (err) {
    console.error("Error fetching escorts:", err);
    res.status(500).json({ message: "Could not fetch escorts" });
  }
};

const getAllUnverifiedEscorts = async (req, res) => {
  try {
    const escortDoc = await EscortModel.find({ isActive: false });
    res.status(200).json(escortDoc);
  } catch (err) {
    console.error("Error fetching escorts:", err);
    res.status(500).json({ message: "Could not fetch escorts" });
  }
};

const getAllUnverifiedEscortsById = async (req, res) => {
  const id = req.params.id
  try {
    const escortDoc = await EscortModel.findOne({_id: id, isActive: false }).select("+verificationImage");
    res.status(200).json(escortDoc);
  } catch (err) {
    console.error("Error fetching escort:", err);
    res.status(500).json({ message: "Could not fetch escort" });
  }
};

const getPremiumEscorts = async(req, res) => {
  try {
    const escortDoc = await EscortModel.find({ premium: true });
    res.status(200).json(escortDoc);
  } catch (err) {
    console.error("Error fetching escorts:", err);
    res.status(500).json({ message: "Could not fetch escorts" });
  }
}

const getAllClients = async (req, res) => {
  try {
    const clientDoc = await ClientModel.find();
    res.status(200).json(clientDoc);
  } catch (err) {
    console.error("Error fetching clients:", err);
    res.status(500).json({ message: "Could not fetch clients" });
  }
};

module.exports = { getAllEscorts, getAllVerifiedEscorts, getAllClients, getAllUnverifiedEscorts, getPremiumEscorts, getEscortsById, getAllUnverifiedEscortsById };
