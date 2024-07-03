const router = require("express").Router();
const getUserId= require('../utils/getuserId')
const Multer = require('../utils/multer');
const auth = require("../Auth/auth_middleware");
const is_admin = require("../Auth/is_admin");
const workshop_controller = require("../Controllers/workshop_controller");

router.get('/',auth,is_admin,workshop_controller.getWorkshops);
router.get('/getOnlyWorkshops',workshop_controller.getOnlyWorkshops);
router.post('/createWorkshop',auth,is_admin,Multer.single('workshopImage'),getUserId, workshop_controller.createWorkshop);
router.delete("/deleteWorkshop",auth,is_admin,getUserId, workshop_controller.deleteWorkshop);
router.put('/updateWorkshop',auth ,is_admin,Multer.single('workshopImage'),getUserId, workshop_controller.updateWorkshop);
router.post('/userwsReg', auth, workshop_controller.userwsReg);
router.post('/userwsdeReg',workshop_controller.userwsdeReg);
module.exports = router;
