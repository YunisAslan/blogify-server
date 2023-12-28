const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  id: String,
  title: String,
  newsBody: String,
  linkURL: String,
  thumbnailImg: String,
  description: String,
  publisherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "publishers",
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tags",
    },
  ],
  likes: Array,
  createdAt: String,
});

module.exports = NewsSchema;
