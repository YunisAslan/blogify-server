const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/user-controller");
const UserAuthMiddleware = require("../middlewares/user-middleware");

router.get("/", user_controller.getAll);

router.get("/:id", user_controller.getOne);

router.post("/", UserAuthMiddleware, user_controller.post);

router.delete("/:id", user_controller.delete);

router.patch("/:id", user_controller.patch);

module.exports = router;
