const mongoose = require("mongoose");
const SubscriptionSchema = require("../schemas/subscription-schema");

const SubscriptionModel = mongoose.model("subscriptions", SubscriptionSchema);

module.exports = SubscriptionModel;
