const express = require("express");
const router = express.Router();

const news_controller = require("../controllers/news-controller");

router.get("/", news_controller.getAll);

router.get("/:id", news_controller.getOne);

router.get("/publisher/:id", news_controller.getPublisherAllNews);

router.patch("/like/:id", news_controller.likeNewsPost);

router.post("/", news_controller.post);

router.delete("/:id", news_controller.delete);

router.patch("/:id", news_controller.patch);

module.exports = router;
