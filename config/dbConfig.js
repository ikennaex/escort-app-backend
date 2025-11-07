const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("Already connected to database");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // maxPoolSize can help with limiting connections
      maxPoolSize: 30,
    });

    isConnected = true;
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

module.exports = connectDB;
