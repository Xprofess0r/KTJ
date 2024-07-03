const newNavigator = require("../models/navbar.model");



const path = require("path");
const activityController = require("./activity_controller");
exports.getNavbar = async (req, res, next) => {    
  try {
    const navbar = await newNavigator.find();   
    return res.status(200).json({
      message: "Navbar fetched Successfully",
      navbar: navbar,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};
exports.deleteNavigator = async (req, res, next) => { 
  let id = req.body._id;
  try {
    let navigator = await newNavigator.findById(id); 
    if (!navigator) {
      let error = new Error("Navigation does not exists!");
      error.statusCode = 404;
      throw error;
      
      
    }
    
    await navigator.delete();  
    await activityController.createActivity(
      {
        userId: req.userIdForActivity,
        description: "Deleted Navigation :" + navigator.navName,
      },
      next
    );
    return res
      .status(200)
      .json({ message: "Navigator Deleted Successfully" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};
exports.updateNavigator = async (req, res, next) => {
  const { _id, navName, Status, navLink, visiblity, isAuthenticated} = req.body;
  
  try {
    let navigator = await newNavigator.findById(_id);
    if (!navigator) {
      let error = new Error("Navigator  does not exists!");
      error.statusCode = 404;
      throw error;
    }
    navigator.navName = navName;
    navigator.Status = Status;
    navigator.navLink = navLink;
    navigator.visiblity = visiblity;  
    navigator.isAuthenticated= isAuthenticated;

    await navigator.save();
    await activityController.createActivity(
      {
        userId: req.userIdForActivity,
        description: "Updated Navigation :" + navigator.navName,
      },
      next
    );
    return res.status(200).json({
      message: "Navigation updated Successfully",
      navigator: navigator,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};
exports.createNavigator = async (req, res, next) => {
  const { _id, navName, Status, navLink, visiblity, } = req.body;
  try {
    let oldNavigator =  await newNavigator.findOne({ navName: `${navName}`}) 
    if(oldNavigator == null){
      const navigator = new newNavigator({
        navName,
        Status,
        visiblity,
        isAuthenticated,
        navLink,
      });
      await navigator.save();
      await activityController.createActivity(
        {
          userId: req.userIdForActivity,
          description: "Created Navigation :"+navigator.navName,
        },
      next
      );
      return res.status(200).json({
      message: "Navigation created successfully",
      navigator,
      });
    }
    else {
      let error = new Error(" Navigation with this name already exits ,Try using a different name. "
        );
         error.statusCode = 409;
         throw error;
    }
    ;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};
