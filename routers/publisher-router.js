const express = require("express");
const router = express.Router();
const upload = require("../helpers/multerUpload");

const publisher_controller = require("../controllers/publisher-controller");

router.get("/", publisher_controller.getAll);

router.get("/:id", publisher_controller.getOne);

router.post("/", upload?.single("profileImg"), publisher_controller.post);

router.get("/verify/:token", publisher_controller.verify);

router.post("/login", publisher_controller.login);

router.delete("/:id", publisher_controller.delete);

router.patch("/:id", publisher_controller.patch);

module.exports = router;
