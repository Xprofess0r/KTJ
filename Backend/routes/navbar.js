const express = require('express');
const router = express.Router();
const navbar_controller = require('../Controllers/navbar_controller');
const auth = require("../Auth/auth_middleware");
const is_admin = require("../Auth/is_admin");
const getUserId= require('../utils/getuserId')

router.post('/createNavigation',auth ,is_admin,getUserId,navbar_controller.createNavigator);

router.get('/',navbar_controller.getNavbar);

router.delete('/deleteNavigation',auth ,is_admin,getUserId,navbar_controller.deleteNavigator);

router.put('/updateNavigation',auth ,is_admin,getUserId,navbar_controller.updateNavigator)
module.exports = router