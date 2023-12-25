const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  userId: String,
  publisherId: String,
});

module.exports = SubscriptionSchema;
