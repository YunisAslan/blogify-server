const mongoose = require("mongoose");

const PublisherSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  backgroundImg: String,
  profileImg: Object,
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
  type: String,
});

module.exports = PublisherSchema;
