const express = require('express');
const router = express.Router();
const auth = require("../Auth/auth_middleware");
const is_admin = require("../Auth/is_admin");
const getUserId= require('../utils/getuserId')
const Multer = require('../utils/multer');
const sponsorController = require('../Controllers/sponsor_controller.js');


router.post('/createSponsor',auth ,is_admin,getUserId, sponsorController.createSponsor)
router.post('/createSponsorCategory',auth ,is_admin,getUserId, sponsorController.createSponsorCategory)
router.post('/editSponsorCategory',auth ,is_admin,getUserId, sponsorController.editSponsorCategory)
router.put('/editSponsor',auth ,is_admin,getUserId, sponsorController.editSponsor )
router.get("/",sponsorController.getSponsors)
router.get("/getAllSponsors",sponsorController.getAllSponsors)
router.delete('/deleteSponsor',auth ,is_admin,getUserId, sponsorController.deleteSponsor);
router.delete('/deleteCategory',auth ,is_admin,getUserId, sponsorController.deleteCategory);
router.put('/updateSponsor',auth ,is_admin,getUserId, sponsorController.updateSponsor);
router.put('/editPriority',auth ,is_admin,getUserId, sponsorController.editPriority);

module.exports = router;