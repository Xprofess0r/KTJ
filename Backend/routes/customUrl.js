const express = require("express");
const router = express.Router();
const url_controller = require("../Controllers/customUrl_controller");
const auth = require("../Auth/auth_middleware");
const is_admin = require("../Auth/is_admin");
const getUserId= require('../utils/getuserId')

router.post("/createUrl", auth, is_admin,getUserId, url_controller.createUrl);
router.post("/deleteUrl", auth, is_admin,getUserId, url_controller.deleteUrl);
router.put("/editUrl", auth, is_admin,getUserId, url_controller.editUrl);
router.get("/getUrls", url_controller.getUrls);
router.get("/redirect*", url_controller.redirect);

module.exports = router;