const PublisherModel = require("../models/publisher-model");
const NewsModel = require("../models/news-model");
const bcrypt = require("bcrypt");

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
  // register
  post: async (req, res) => {
    try {
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      req.body.password = hashedPassword;
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
  // login
  login: async (req, res) => {
    console.log("body", req.body);
    const { username, email, password } = req.body;

    const publisher = await PublisherModel.findOne({ email });

    if (!publisher) {
      res.send({
        success: false,
        message: "Invalid credentials or unverified account",
        data: null,
      });
      return;
    }

    const comparePassword = await bcrypt.compare(password, publisher.password);

    if (!comparePassword) {
      res.status(401).send({
        success: false,
        message: "Invalid credentials or unverified account",
        data: null,
      });
      return;
    } else {
      res.status(200).send({
        success: true,
        message: `Welcome ${username}!`,
        data: publisher,
      });
    }
  },
  // logout
  // verify email
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
    const updatedPublisher = req.body;

    try {
      // hash updated password
      const password = updatedPublisher.password;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updatedPublisher.password = hashedPassword;

      await PublisherModel.findByIdAndUpdate(id, req.body);
      const updatedData = await PublisherModel.findById(id);

      res.send({
        message: "Publisher updated successfully.",
        data: updatedData,
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
