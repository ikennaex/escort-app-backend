const express = require("express");
const app = express();
const port = process.env.PORT || 4000; 
const cors = require("cors")
const connectDB = require("./config/dbConfig");
const cookieParser = require("cookie-parser");
const escortRegisterRoute = require("./routes/EscortRegisterRoute");
const clientRegisterRoute = require("./routes/ClientRegisterRoute");
const loginRoute = require("./routes/LoginRoute");
const escortDetailsRoute = require("./routes/EscortDetailsRoute");
const escortServicesRoute = require("./routes/EscortServicesRoute");
const escortRatesRoute = require("./routes/EscortRatesRoute");
const escortGalleryRoute = require("./routes/EscortGalleryRoute");
const escortVerificationRoute = require("./routes/EscortVerificationRoute");
const fetchEscortsRoute = require("./routes/FetchEscortsRoute");

require('dotenv').config();

// database connection 
connectDB() 

// middelwares
app.use(express.json());
app.use(cookieParser());  

// cors middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://escort-app-0p4c.onrender.com"
    ], 
    credentials: true, 
  })
);

// auth routes
app.use("/auth", escortRegisterRoute);
app.use("/auth", clientRegisterRoute);
app.use("/auth", loginRoute);

// escort detail 
app.use("/escortdetails", escortDetailsRoute);
app.use("/escortservices", escortServicesRoute);
app.use("/escortrates", escortRatesRoute);
app.use("/escortgallery", escortGalleryRoute);  
app.use("/escortverification", escortVerificationRoute);  

// fetch escorts
app.use("/escorts", fetchEscortsRoute);  

// run server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})