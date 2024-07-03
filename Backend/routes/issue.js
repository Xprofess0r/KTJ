const router = require("express").Router();

const auth = require("../Auth/auth_middleware");
const is_admin = require("../Auth/is_admin");
const issueController = require("../Controllers/issue_controller");

const Multer = require("../utils/multer");

// user craetes the issue
router.post("/createIssue", issueController.createIssue);
router.get("/getIssues", issueController.getIssues);

// when the admin solve the issue he can update the status of the issue in the dasboard
router.post("/issueSolved", issueController.issueSolved);

module.exports = router;
