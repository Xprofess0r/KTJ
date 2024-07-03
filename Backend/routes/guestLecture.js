const express = require('express');
const router = express.Router();
const auth = require("../Auth/auth_middleware");
const is_admin = require("../Auth/is_admin");
const getUserId= require('../utils/getuserId')
// const Multer = require('../utils/multer');
const guestLecture_controller = require('../Controllers/guestLecture_controller');


router.post('/createguestLecture',auth ,is_admin,getUserId,guestLecture_controller.createGuestLecture);
router.get('/',guestLecture_controller.getGuestLectures);
router.delete('/deleteguestLecture',auth ,is_admin,getUserId,guestLecture_controller.deleteGuestLecture);
router.put('/updateguestLecture',auth ,is_admin,getUserId,guestLecture_controller.updateGuestLecture);
router.post('/register',auth,guestLecture_controller.userglReg);

module.exports = router
