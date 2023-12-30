const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  fullName: String,
  email: String,
  password: String,
  profileImage: String,
  subscriptions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subscriptions",
    },
  ],
  isAdmin: Boolean,
  isVerified: Boolean,
});

module.exports = UserSchema;
