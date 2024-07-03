const router = require("express").Router();

const {
  pushNotification,
  subscribeNotification,
  testNotification,
  getUserCount,
  getNotifications,
} = require("../Controllers/Notification");
const auth = require("../Auth/auth_middleware");
const is_admin = require("../Auth/is_admin");
const getUserId = require("../utils/getuserId");
router.get("/", getNotifications);
router.post("/subscribe", subscribeNotification);
router.post("/push", auth, is_admin, getUserId, pushNotification);
router.post("/test", auth, is_admin, getUserId, testNotification);
router.get("/userCount", auth, is_admin, getUserCount);
module.exports = router;
