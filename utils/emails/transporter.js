const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.zeptomail.com",       // Zoho SMTP server
  port: 587,                   // use 465 for secure SSL
  secure: false,                // true for port 465, false for 587
  auth: {
    user: "emailapikey",
    pass: process.env.EMAIL_PASS, // your Zoho app password
  },
});

module.exports = transporter;



// var nodemailer = require('nodemailer');
// var transport = nodemailer.createTransport({
//     host: "smtp.zeptomail.com",
//     port: 587,
//     auth: {
//     user: "emailapikey",
//     pass: "wSsVR60l+kX5W68sz2CldeduylpXBA6lFk8r3VWi7Cf0FqzF8sczl03MBlPzHvNLEm9hEDRApul/yh5T0zpYh9ktyFkGXSiF9mqRe1U4J3x17qnvhDzMWGRUkBKIKYoLwAxsn2ZjFs8l+g=="
//     }
// });

// var mailOptions = {
//     from: '"Example Team" <noreply@oscrovilla.com>',
//     to: 'admin@oscrovilla.com',
//     subject: 'Test Email',
//     html: 'Test email sent successfully.',
// };

// transport.sendMail(mailOptions, (error, info) => {
//     if (error) {
//     return console.log(error);
//     }
//     console.log('Successfully sent');
// });