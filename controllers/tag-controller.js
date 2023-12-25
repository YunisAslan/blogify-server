const TagModel = require("../models/tag-model");

const tag_controller = {
  getAll: async (req, res) => {
    const tags = await TagModel.find({});

    if (tags.length === 0) {
      res.status(204).send({
        message: "Empty tags data",
      });
    } else {
      res.status(200).send({
        message: "Successfully getted",
        data: tags,
      });
    }
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    const tag = await TagModel.findById(id);

    if (tag) {
      res.send({
        message: "Successfully getted tag",
        data: tag,
      });
    } else {
      res.status(404).send({
        message: "Tag not found",
      });
    }
  },
  post: async (req, res) => {
    try {
      const newTag = new TagModel(req.body);
      await newTag.save();

      res.send({
        message: "Tag is successfully created",
        data: newTag,
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

    const deletedData = await TagModel.findById(id);
    await TagModel.findByIdAndDelete(id);

    try {
      if (deletedData) {
        res.send({
          message: "Tag successfully deleted",
          data: deletedData,
        });
      } else {
        res.status(404).send({
          message: "Tag not found",
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message: "Internal server error",
      });
    }
  },
  patch: async (req, res) => {
    const { id } = req.params;

    try {
      await TagModel.findByIdAndUpdate(id, req.body);
      const updatedData = await TagModel.findById(id);

      res.send({
        message: "Tag updated successfully.",
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

module.exports = tag_controller;
