const mongoose = require("mongoose");
const PublisherSchema = require("../schemas/publisher-schema");

const PublisherModel = mongoose.model("publishers", PublisherSchema);

module.exports = PublisherModel;
