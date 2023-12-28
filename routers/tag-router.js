const express = require("express");
const router = express.Router();

const tag_controller = require("../controllers/tag-controller");

router.get("/", tag_controller.getAll);

router.get("/:id", tag_controller.getOne);

router.post("/", tag_controller.post);

router.delete("/:id", tag_controller.delete);

router.patch("/:id", tag_controller.patch);

router.get("/news/:newsId", tag_controller.getAllTagsByNewsID);

module.exports = router;
