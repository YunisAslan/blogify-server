const { default: mongoose } = require("mongoose");
const TagSchema = require("../schemas/tag-schema");

const TagModel = mongoose.model("tags", TagSchema);

module.exports = TagModel;
