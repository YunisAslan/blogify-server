const UserModel = require("../models/user-model");
const SubscriptionModel = require("../models/subscription-model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendVerifyEmail = require("../helpers/sendEmail");

const user_controller = {
  getAll: async (req, res) => {
    const { name } = req.query;
    const users = await UserModel.find({});

    if (name) {
      const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().trim().includes(name.toLowerCase().trim())
      );

      res.send(filteredUsers);
    } else {
      res.send({
        message: "Successfully getted data",
        data: users,
      });
    }
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    const user = await UserModel.findById(id);

    if (user) {
      res.send({
        message: "Successfully getted user",
        data: user,
      });
    } else {
      res.status(404).send({
        message: "User not found",
      });
    }
  },
  // register
  post: async (req, res) => {
    try {
      const {
        username,
        fullName,
        email,
        password,
        profileImg,
        subscriptions,
        isAdmin,
        type,
        isVerified,
      } = req.body;

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      req.body.password = hashedPassword;

      const createdUser = {
        username,
        fullName,
        email,
        password: req.body.password,
        subscriptions,
        isAdmin,
        type,
        isVerified,
        profileImg,
      };

      const newUser = new UserModel(createdUser);

      const token = jwt.sign(
        { email: req.body.email },
        process.env.SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("token", token, { httpOnly: true, secure: true });

      sendVerifyEmail("users", req.body.email, token);

      await newUser.save();

      res.send({
        message: "User is successfully registered",
        data: newUser,
      });
    } catch (err) {
      res.status(500).send({
        message: "Internal server error",
      });
    }
  },
  // login
  login: async (req, res) => {
    const { username, email, password } = req.body;

    const user = await UserModel.findOne({ email });

    const token = jwt.sign(
      { id: user?._id, username, email, password },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    res.cookie("token", token, { httpOnly: true, secure: true });

    if (!user) {
      res.send({
        success: false,
        message: "Invalid credentials or unverified account",
        data: null,
      });
      return;
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword || !user.isVerified) {
      res.status(401).send({
        success: false,
        message: "Invalid credentials or unverified account!",
        data: null,
      });
      return;
    } else {
      res.status(200).send({
        success: true,
        message: `Welcome ${username}!`,
        data: user,
        token,
      });
    }
  },
  // verify email
  verify: async (req, res) => {
    const { token } = req.params;

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.send({
          message: "Invalid token",
        });
      }

      const foundAccount = await UserModel.findOne({ email: decoded.email });

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

    const deletedUser = await UserModel.findById(id);
    await UserModel.findByIdAndDelete(id);

    // delete subscriptions
    await SubscriptionModel.deleteMany({ userId: id });

    if (!deletedUser) {
      res.status(404).send({
        message: "User not found",
      });
    } else {
      res.send({
        message: "User successfully deleted",
        data: deletedUser,
      });
    }
  },
  patch: async (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    // hash updated password
    const password = updatedUser.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    updatedUser.password = hashedPassword;

    await UserModel.findByIdAndUpdate(id, updatedUser);
    const updatedData = await UserModel.findById(id);

    res.send({
      message: "User updated successfully.",
      data: updatedData,
    });
  },
};

module.exports = user_controller;
