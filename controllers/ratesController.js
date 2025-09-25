const rates = require("../config/rates")

const getRates = (req, res) => {
    res.json(rates)
}

module.exports = {getRates}