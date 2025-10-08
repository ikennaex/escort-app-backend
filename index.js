const express = require("express");
const app = express();
const port = process.env.PORT || 4000; 
const cors = require("cors")
const connectDB = require("./config/dbConfig");
const cookieParser = require("cookie-parser");
const startSubscriptionCron = require("./cron/subscriptionCron");
const escortRegisterRoute = require("./routes/EscortRegisterRoute");
const clientRegisterRoute = require("./routes/ClientRegisterRoute");
const loginRoute = require("./routes/LoginRoute");
const escortDetailsRoute = require("./routes/EscortDetailsRoute");
const escortServicesRoute = require("./routes/EscortServicesRoute");
const escortRatesRoute = require("./routes/EscortRatesRoute");
const escortGalleryRoute = require("./routes/EscortGalleryRoute");
const escortVerificationRoute = require("./routes/EscortVerificationRoute");
const getRatesRoute = require("./routes/RatesRoute");
const fetchEscortsRoute = require("./routes/FetchEscortsRoute");
const editEscortProfileRoute = require("./routes/EditEscortProfileRoute");
const escortBankDetailsRoute = require("./routes/EscortBankDetailsRoute");
const verifyPaymentRoute = require("./routes/VerifyPaymentRoute");
const getSubscriptionDetailsRoute = require("./routes/SubscriptionDetailsRoute");
const checkUsersExistsRoute = require("./routes/CheckUsersExistsRoute");

// Admin routes
const adminGetUsersRoute = require("./routes/Admin/AdminGetUsersRoute");
const adminApproveEscortRoute = require("./routes/Admin/AdminApproveEscortRoute");
const adminSubscriptionRoute = require("./routes/Admin/payments/AdminSubscriptionRoute");
const adminLoginRoute = require("./routes/Admin/AdminLoginRoute");

// Subcription Cron Job 
startSubscriptionCron()

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
      "https://oscrovilla.com",
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

// edit route for escort
app.use("/escorts/edit", editEscortProfileRoute);  
app.use("/escorts/bankdetails", escortBankDetailsRoute);  

// fetch escorts
app.use("/escorts", fetchEscortsRoute); 

// get rates to boost profile 
app.use("/escorts", getRatesRoute); 

// verifying payments
app.use("/escorts", verifyPaymentRoute); 

// check if user exists
app.use("/user", checkUsersExistsRoute);

// getting subscription details
app.use("/escorts/premium", getSubscriptionDetailsRoute); 

//admin
app.use("/admin", adminGetUsersRoute); 
app.use("/admin", adminApproveEscortRoute); 
app.use("/admin", adminSubscriptionRoute); 
app.use("/admin", adminLoginRoute); 

// run server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})