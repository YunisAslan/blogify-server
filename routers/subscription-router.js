const express = require("express");
const router = express.Router();

const subscription_controller = require("../controllers/subscription-controller");

router.get("/", subscription_controller.getAll);

router.get("/:id", subscription_controller.getOne);

router.post("/", subscription_controller.post);

router.delete("/:id", subscription_controller.delete);

router.patch("/:id", subscription_controller.patch);

module.exports = router;
