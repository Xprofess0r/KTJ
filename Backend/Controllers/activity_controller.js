const mongoose = require("mongoose");
const Activity = require("../models/activity.model");

exports.getActivities = async (req, res, next) => {
  try {
    let activities = await Activity.find()
      .limit(100)
      .populate("user", ["username", "email"]);

    return res.status(200).json({
      message: "Activities Fetched Successfully",
      activities: activities.reverse(),
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};
exports.createActivity = async (req, next) => {
  const { userId, description } = req;
  try {
    let count = await Activity.count();

    // delete the activity record if more than 100
    // if (count > 100) {
    //   await Activity.deleteMany();
    // }

    const activity = new Activity({ user: userId, description });
    await activity.save();
    return;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};
