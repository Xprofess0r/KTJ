const router = require("express").Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const auth = require("../Auth/auth_middleware");
const is_admin = require("../Auth/is_admin");
const user_controller = require("../Controllers/user_controller");
let common_controller = require("../Controllers/common_controller");

router.get("/", auth, is_admin, user_controller.getAllUsers);
router.post("/getSpecificUserCount", auth, is_admin, user_controller.getSpecificUserCount);
router.post("/filterUsers", auth, is_admin, user_controller.filterUsers);
router.post("/getSpecificPageUsers", auth, user_controller.getSpecificPageUsers);
router.get("/userCount", auth, is_admin, user_controller.getUserCount);
router.get("/paidCount", auth, is_admin, user_controller.getPaidCount);
router.post("/updatePay",auth, is_admin,  user_controller.updatePay);
router.post("/getPay", auth, user_controller.getPay);
router.post("/userCheck", auth, is_admin, user_controller.checkUserExist);
router.post(
  "/send_mail",
  auth,
  is_admin,
  common_controller.sendEmailToAllusers
);
router.post("/getUserInfo", auth, user_controller.getUserInfo);
router.route("/preregister").post(user_controller.userPreRegister);
router.route("/preregisterGoogle").post(user_controller.userGooglePreRegister);
router.route("/register").post(user_controller.userRegister);
router.route("/login").post(user_controller.userLogin);
router.route("/googleLogin").post(user_controller.googleLogin);
router.route("/forgot_password").post(user_controller.forgotPassword);
router.route("/findUser").get(user_controller.findUser);
router.route("/update/password").post(auth, user_controller.userUpdatePassword);
router.route("/update/email").post(auth, user_controller.userUpdateEmail);
router.post("/updateProfile", auth, user_controller.updateUserProfile);
//router.route("/delete").post(auth, user_controller.userDelete);
router.route("/validate").post(user_controller.userValidate);

router.route("/workshop_reg").post(auth, user_controller.userWorkshopReg);
router.route("/userAuth").get(auth, user_controller.userAuth);
router.route("/workshop_dereg").post(auth, user_controller.userWorkshopDereg);

router.route("/event_reg").post(auth, user_controller.userEventReg);
router.route("/event_dereg").post(auth, user_controller.userEventDereg);

router.get("/getUsers", auth, is_admin, user_controller.getAllUsers);
router.post("/changeUserType", auth, is_admin, user_controller.changeUserType);
router
  .route("/workshop_user_details")
  .post(auth, user_controller.workshopUserDetails);

module.exports = router;
