const router = require("express").Router();

const auth = require("../Auth/auth_middleware");
const is_admin = require("../Auth/is_admin");
const eventController = require("../Controllers/event_controller");
const Multer = require("../utils/multer");
const getUserId= require('../utils/getuserId')
// router.post('/post',auth, event_controller.eventAdd);

// Multer is a middleware to handle file uploads(images of guests)

router.post("/createEvent",auth,is_admin,getUserId,eventController.createEvent);
router.get("/", eventController.getEvents);
router.post("/updateEvent",auth,is_admin,getUserId, eventController.updateEvent);
router.post("/deleteEvent",auth,is_admin,getUserId, eventController.deleteEvent);
//router.route("/Delete").post(auth, event_controller.eventDelete);
//router.route("/update/title").post(auth, event_controller.eventUpdateTitle);
//router.route("/update/description").post(auth, event_controller.eventUpdateDescription);

module.exports = router;
