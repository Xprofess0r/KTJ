const router = require("express").Router();
const auth = require("../Auth/auth_middleware");
const is_admin = require("../Auth/is_admin");
const regForLetter_controller = require("../Controllers/regForLetter_controller");

router.route("/add").post(regForLetter_controller.emailAdd);
router.get("/", auth, is_admin, regForLetter_controller.getRegisteredUsers);

module.exports = router;
