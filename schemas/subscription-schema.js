const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  publisherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "publishers",
  },
});

module.exports = SubscriptionSchema;
