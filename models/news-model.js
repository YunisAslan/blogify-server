const mongoose = require("mongoose");
const NewsSchema = require("../schemas/news-schema");

const NewsModel = mongoose.model("news", NewsSchema);

module.exports = NewsModel;
