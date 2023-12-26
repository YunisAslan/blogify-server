const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");

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
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      req.body.password = hashedPassword;
      const newUser = new UserModel(req.body);
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
    // const comparedPassword = bcrypt.compare(
    //   password,
    //   user.password,
    //   (err, res) => {
    //     if (err) {
    //       res.send({ message: "Something went wrong!" });
    //     }

    //     if (res) {
    //       // ???
    //     } else {
    //       return res.send({ message: "Passwords do not match" });
    //     }
    //   }
    // );

    if (!user) {
      res.send({
        success: false,
        message: "Invalid credentials or unverified account",
        data: null,
      });
      return;
    }

    const comparedPassword = await bcrypt.compare(password, user.password);
    if (!comparedPassword) {
      res.status(401).send({
        success: false,
        message: "Invalid credentials or unverified account!",
        data: null,
      });
      return;
    } else {
      res
        .status(200)
        .send({ success: true, message: `Welcome ${username}!`, data: user });
    }
  },
  // logout
  // verify email
  delete: async (req, res) => {
    const { id } = req.params;

    const deletedUser = await UserModel.findById(id);
    await UserModel.findByIdAndDelete(id);

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
