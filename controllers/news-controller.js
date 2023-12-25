const NewsModel = require("../models/news-model");

const news_controller = {
  getAll: async (req, res) => {
    const news = await NewsModel.find({});

    if (news.length === 0) {
      res.status(204).send({
        message: "Empty news data",
      });
    } else {
      res.status(200).send({
        message: "Successfully getted",
        data: news,
      });
    }
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    const newsData = await NewsModel.findById(id);

    if (newsData) {
      res.send({
        message: "Successfully getted news",
        data: newsData,
      });
    } else {
      res.status(404).send({
        message: "News not found",
      });
    }
  },
  post: async (req, res) => {
    const createdNews = new NewsModel(req.body);
    await createdNews.save();

    try {
      res.send({
        message: "News is successfully created",
        data: createdNews,
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

    try {
      const deletedData = await NewsModel.findById(id);
      await NewsModel.findByIdAndDelete(id);

      if (deletedData) {
        res.send({
          message: "News successfully deleted",
          data: deletedData,
        });
      } else {
        res.status(404).send({
          message: "News not found",
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
      await NewsModel.findByIdAndUpdate(id, req.body);
      const updatedNews = await NewsModel.findById(id);

      res.send({
        message: "News updated successfully.",
        data: updatedNews,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message: "Internal server error",
      });
    }
  },
  getPublisherAllNews: async (req, res) => {
    const { id } = req.params;
    const publisherNews = await NewsModel.find({ publisherId: id });

    res.send({
      message: "Successfully getted publisher news",
      data: publisherNews,
    });
  },
};

module.exports = news_controller;
