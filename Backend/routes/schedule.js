const express = require('express');
const router = express.Router();
const schedule_controller = require('../Controllers/schedule_controller');
const auth = require("../Auth/auth_middleware");
const is_admin = require("../Auth/is_admin");
const getUserId= require('../utils/getuserId')

router.post('/createSchedule',auth ,is_admin,getUserId,schedule_controller.createSchedule);

router.get('/',schedule_controller.getSchedule);
router.get('/getSchedule',schedule_controller.get_specific_Schedule);

router.post('/deleteSchedule',auth ,is_admin,getUserId,schedule_controller.deleteSchedule);

router.put('/updateSchedule',auth ,is_admin,getUserId,schedule_controller.updateSchedule)
module.exports = router