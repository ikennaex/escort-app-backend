const SubscriptionModel = require("../../models/Subscription")


const getSubcriptionDetails = async (req, res) => {
    try {
        const subscriptionDoc = await SubscriptionModel.find().populate("user").sort({endDate: -1})
        return res.status(200).json(subscriptionDoc)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "Error fetching subcription details", Error:err})
    }
}

module.exports = {getSubcriptionDetails}