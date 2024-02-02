const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/user-controller");
const UserAuthMiddleware = require("../middlewares/user-middleware");

router.get("/", user_controller.getAll);

router.get("/:id", user_controller.getOne);

router.post("/", user_controller.post);

router.get("/verify/:token", user_controller.verify);

router.post("/login", user_controller.login);

router.delete("/:id", user_controller.delete);

router.patch("/:id", user_controller.patch);

module.exports = router;
