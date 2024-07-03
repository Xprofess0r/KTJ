const express = require('express');
const router = express.Router();
const auth = require("../Auth/auth_middleware");
const is_admin = require("../Auth/is_admin");
const Multer = require('../utils/multer');
const competitionController = require('../Controllers/competition_controller');
const getUserId = require('../utils/getuserId');

router.put("/updateCompetition", auth, is_admin, Multer.single("competitionImage"), getUserId, competitionController.updateCompetition);
router.post("/deleteCompetition", auth, is_admin, getUserId, competitionController.deleteCompetition);
router.get("/",  /*auth, is_admin,*/  competitionController.getCompetitions);
router.get("/getcompetitions",auth,is_admin,competitionController.getCompetitionsAdmin);
router.post('/createCompetition', auth, is_admin, Multer.single('competitionImage'), getUserId, competitionController.createCompetition);
router.get('/:competitionUrl', competitionController.getCompetitionById);

module.exports = router;