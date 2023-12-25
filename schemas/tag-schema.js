const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  name: String,
  newsId: String,
});

module.exports = TagSchema;
