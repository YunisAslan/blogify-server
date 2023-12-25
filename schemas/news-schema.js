const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  id: String,
  title: String,
  newsBody: String,
  linkURL: String,
  thumbnailImg: String,
  publisherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "publishers",
  },
  createdAt: String,
});

module.exports = NewsSchema;
