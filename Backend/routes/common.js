const express = require("express");
const router = express.Router();
const common_controller = require("../Controllers/common_controller");
const auth = require("../Auth/auth_middleware");
const is_admin = require("../Auth/is_admin");
const getUserId= require('../utils/getuserId')

router.post("/updateStatus", auth, is_admin,getUserId, common_controller.updateStatus);
module.exports = router;
