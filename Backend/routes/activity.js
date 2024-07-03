const express = require("express");
const router = express.Router();
const activity_controller = require("../Controllers/activity_controller");
const auth = require("../Auth/auth_middleware");
const is_admin = require("../Auth/is_admin");

router.get("/", auth, is_admin, activity_controller.getActivities);

module.exports = router;
