const PublisherModel = require("../models/publisher-model");
const NewsModel = require("../models/news-model");

const publisher_controller = {
  getAll: async (req, res) => {
    const publishers = await PublisherModel.find({});

    if (publishers.length === 0) {
      res.status(204).send({
        message: "Empty publishers data",
      });
    } else {
      res.status(200).send({
        message: "Successfully getted",
        data: publishers,
      });
    }
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    const publisher = await PublisherModel.findById(id);

    if (publisher) {
      res.send({
        message: "Successfully getted publisher data",
        data: publisher,
      });
    } else {
      res.status(404).send({
        message: "Publisher not found",
      });
    }
  },
  post: async (req, res) => {
    try {
      const newPublisher = new PublisherModel(req.body);
      await newPublisher.save();

      res.send({
        message: "Publisher is successfully registered",
        data: newPublisher,
      });
    } catch (err) {
      console.error(err);

      res.status(500).send({
        message: "Internal server error",
      });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;

    const deletedData = await PublisherModel.findById(id);
    await PublisherModel.findByIdAndDelete(id);

    // delete publisher all news
    await NewsModel.deleteMany({ publisherId: id });

    if (!deletedData) {
      res.status(404).send({
        message: "Publisher not found",
      });
    } else {
      res.send({
        message: "Publisher successfully deleted",
        data: deletedData,
      });
    }
  },
  patch: async (req, res) => {
    const { id } = req.params;

    try {
      await PublisherModel.findByIdAndUpdate(id, req.body);
      const updatedPublisher = await PublisherModel.findById(id);

      res.send({
        message: "Publisher updated successfully.",
        data: updatedPublisher,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message: "Internal server error",
      });
    }
  },
};

module.exports = publisher_controller;
