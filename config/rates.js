require('dotenv').config();

const rates = {
  weekly: process.env.WEEKLY_RATE,
  biweekly: process.env.BIWEEKLY_RATE,
  monthly: process.env.MONTHLY_RATE,
  quarterly: process.env.QUARTERLY_RATE,
  "semi-annually": process.env.SEMIANNUAL_RATE,
  annually: process.env.ANNUAL_RATE,
};

module.exports = rates;