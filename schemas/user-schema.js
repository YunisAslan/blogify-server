const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  fullName: String,
  email: String,
  password: String,
  profileImg: Object,
  subscriptions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subscriptions",
    },
  ],
  isAdmin: Boolean,
  isVerified: Boolean,
  type: String,
});

module.exports = UserSchema;
