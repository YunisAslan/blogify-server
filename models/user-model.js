const mongoose = require("mongoose");
const UserSchema = require("../schemas/user-schema");

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
