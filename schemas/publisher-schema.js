const mongoose = require("mongoose");

const PublisherSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  backgroundImg: String,
  profileImg: String,
  name: String,
  description: String,
  joinedDate: String,
  subscriptions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subscriptions",
    },
  ],
  isVerified: Boolean,
});

module.exports = PublisherSchema;
