const router = require("express").Router();

const auth = require("../Auth/auth_middleware");
const interactive_controller = require("../Controllers/interactive_controller");
const user_controller = require("../Controllers/user_controller")
router.post("/register", auth, interactive_controller.userwsReg);
router.get("/", auth, interactive_controller.getInteractiveUsers);
router.get("/getIUpdatedUser/:id", user_controller.getUserbyId)
router.get("/getIU", interactive_controller.getIU);
router.post("/addSession", interactive_controller.addSession);
router.delete('/sessions/:id', interactive_controller.deleteSession);
module.exports = router;
 