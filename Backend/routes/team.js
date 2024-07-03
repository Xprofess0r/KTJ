const router = require("express").Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const auth = require("../Auth/auth_middleware");
const team_controller = require("../Controllers/team_controller");

router.route("/register").post(auth, team_controller.teamRegister);
// router.post("/addmember", auth, team_controller.teamAddMember);
// router.post("/removemember", auth, team_controller.teamRemoveMember);
router.route("/login").post(auth, team_controller.teamLogin);
router.route("/delete").post(auth, team_controller.deleteTeam);
//router.route("/add_member").post(auth, team_controller.teamAddMember);
//router.route("/remove_member").post(auth, team_controller.teamRemoveMember);
// router.route("/teamDetails").post(auth, team_controller.teamDetails);
router.route("/eventTeamDetails").post(auth, team_controller.eventTeamDetails);
router.post("/edit", auth, team_controller.editTeam);
module.exports = router;
