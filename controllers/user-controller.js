const UserModel = require("../models/user-model");

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
  post: async (req, res) => {
    try {
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

    await UserModel.findByIdAndUpdate(id, updatedUser);
    const updatedData = await UserModel.findById(id);

    res.send({
      message: "User updated successfully.",
      data: updatedData,
    });
  },
};

module.exports = user_controller;
