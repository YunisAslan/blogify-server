const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  fullName: String,
  email: String,
  password: String,
  profileImage: String,
  isAdmin: Boolean,
  isVerified: Boolean,
});

module.exports = UserSchema;
