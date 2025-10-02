// Authentication middleware 
// const UserModel = require("../models/User");
require('dotenv').config();

const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    if (decoded.userType !== "Admin") {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Admin token is not valid", Error: error});
  }
};


module.exports = {authToken, adminAuth}