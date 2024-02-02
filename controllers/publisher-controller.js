const PublisherModel = require("../models/publisher-model");
const NewsModel = require("../models/news-model");
const SubscriptionModel = require("../models/subscription-model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendVerifyEmail = require("../helpers/sendEmail");

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
      const {
        username,
        email,
        backgroundImg,
        name,
        password,
        description,
        joinedDate,
        profileImg,
        subscriptions,
        type,
        isVerified,
      } = req.body;

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      req.body.password = hashedPassword;

      const createdPublisher = {
        username,
        email,
        password: req.body.password,
        backgroundImg,
        name,
        description,
        joinedDate,
        subscriptions,
        type,
        isVerified,
        profileImg,
      };

      const newPublisher = new PublisherModel(createdPublisher);

      // generate token
      const token = jwt.sign(
        { email: req.body.email },
        process.env.SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("token", token, { httpOnly: true, secure: true });

      // send email
      sendVerifyEmail("publishers", req.body.email, token);

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
    const { username, email, password } = req.body;

    const publisher = await PublisherModel.findOne({ email });

    // generate token
    const token = jwt.sign(
      { id: publisher?._id, username, email, password, type: publisher?.type },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("token", token, { httpOnly: true, secure: true });

    if (!publisher) {
      res.send({
        success: false,
        message: "Invalid credentials or unverified account",
        data: null,
      });
      return;
    }

    const comparePassword = await bcrypt.compare(password, publisher.password);

    if (!comparePassword || !publisher.isVerified) {
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
        token,
      });
    }
  },
  // verify account
  verify: async (req, res) => {
    const { token } = req.params;

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.send({
          message: "Invalid token",
        });
      }

      const foundAccount = await PublisherModel.findOne({
        email: decoded.email,
      });

      if (!foundAccount) {
        return res.send({
          message: "Account not found with this email!",
        });
      }

      foundAccount.isVerified = true;

      await foundAccount.save();

      res.redirect(`${process.env.CLIENT_BASE_URL}/login`);
    });
  },
  delete: async (req, res) => {
    const { id } = req.params;

    const deletedData = await PublisherModel.findById(id);
    await PublisherModel.findByIdAndDelete(id);

    // delete publisher all news
    await NewsModel.deleteMany({ publisherId: id });
    // delete subscriptions
    await SubscriptionModel.deleteMany({ publisherId: id });

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

    const {
      username,
      email,
      backgroundImg,
      name,
      password,
      description,
      joinedDate,
      subscriptions,
      type,
      isVerified,
      profileImg,
    } = req.body;

    try {
      // hash updated password
      const salt = await bcrypt.genSalt(10);
      if (password) {
        const hashedPassword = await bcrypt.hash(password, salt);
        updatedPublisher.password = hashedPassword;
      }

      const patchedPublisher = {
        username,
        email,
        password: updatedPublisher.password,
        backgroundImg,
        name,
        description,
        joinedDate,
        subscriptions,
        type,
        isVerified,
        profileImg,
      };

      await PublisherModel.findByIdAndUpdate(id, patchedPublisher);
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
