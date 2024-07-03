const User = require("../models/user.model");
const GuestLecture = require("../models/guestLecture.model");
const { getFilesPath, clearImage } = require("../utils/utils");
const path = require("path");
const activityController = require("./activity_controller");

exports.getGuestLectures = async (req, res, next) => {
  try {
    let guestLectures = await GuestLecture.find().populate("users", [
      "email",
      "username",
      "ktjID",
    ]);
    return res.status(200).json({
      message: "Guest Lectures fetched Successfully",
      guestLectures: guestLectures,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};
exports.deleteGuestLecture = async (req, res, next) => {
  let id = req.body._id;
  try {
    let lecture = await GuestLecture.findById(id);
    if (!lecture) {
      let error = new Error("Guest Lecture does not exists!");
      error.statusCode = 404;
      throw error;
      // return res.status(404).json({message:"Guest Lecture Not found"})
    }
    // clearImage(path.join(__dirname, "..", lecture.imageUrl));
    await lecture.delete();
    await activityController.createActivity(
      {
        userId: req.userIdForActivity,
        description: "Deleted Guest Lecture :" + lecture.guestName,
      },
      next
    );
    return res
      .status(200)
      .json({ message: "Guest Lecture Deleted Successfully" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};
exports.updateGuestLecture = async (req, res, next) => {
  const {
    _id,
    guestName,
    lectureDescription,
    youtubeLink,
    registrationLink,
    imageUrl,
  } = req.body;
  // const imageUrl = getFilesPath([req.file]);
  const headKtjId = req.body.headKtjId ? req.body.headKtjId : null;
  let active = req.body.active;
  let registration = req.body.registration;
  try {
    let headObjectId = null;
    if (headKtjId != null) {
      let Id = await User.findOne({ ktjID: headKtjId });
      if (Id == null) {
        let error = new Error("Invalid Ktj Id of Head ");
        error.statusCode = 400;
        throw error;
      } else {
        headObjectId = Id._id;
      }
    }
    let lecture = await GuestLecture.findById(_id);
    if (!lecture) {
      let error = new Error("Guest Lecture  does not exists!");
      error.statusCode = 404;
      throw error;
      // return res.status(404).json({message:"Guest Lecture Not found"})
    }
    lecture.guestName = guestName;
    lecture.lectureDescription = lectureDescription;
    lecture.youtubeLink = youtubeLink;
    lecture.registrationLink = registrationLink;
    lecture.headKtjId = headKtjId;
    lecture.headObjectId = headObjectId;
    lecture.active = active;
    lecture.registration = registration;
    lecture.imageUrl = imageUrl;
    // if (imageUrl.length) {
    //   clearImage(path.join(__dirname, "..", lecture.imageUrl));
    //   lecture.imageUrl = imageUrl[0];
    // }
    await lecture.save();
    await activityController.createActivity(
      {
        userId: req.userIdForActivity,
        description: "Updated Guest Lecture :" + lecture.guestName,
      },
      next
    );
    return res.status(200).json({
      message: "Guest Lecture updated Successfully",
      guestLecture: lecture,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};
exports.createGuestLecture = async (req, res, next) => {
  const {
    guestName,
    lectureDescription,
    youtubeLink,
    registrationLink,
    imageUrl,
  } = req.body;
  // const imageUrl = getFilesPath([req.file])[0];
  const headKtjId = req.body.headKtjId ? req.body.headKtjId : null;

  try {
    let headObjectId = null;
    if (headKtjId != null) {
      let Id = await User.findOne({ ktjID: headKtjId });
      if (Id == null) {
        let error = new Error("Invalid Ktj Id of Head ");
        error.statusCode = 400;
        throw error;
      } else {
        headObjectId = Id._id;
      }
    }
    const guestLecture = new GuestLecture({
      guestName,
      lectureDescription,
      imageUrl,
      headKtjId,
      headObjectId,
      youtubeLink,
      registrationLink,
    });
    await guestLecture.save();
    await activityController.createActivity(
      {
        userId: req.userIdForActivity,
        description: "Created Guest Lecture :" + guestLecture.guestName,
      },
      next
    );
    return res.status(200).json({
      message: "Guest Lecture created successfully",
      guestLecture: guestLecture,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};


exports.userglReg = async (req, res) => {
  try {
    let ktjID = req.body.ktjID;
    let glId = req.body.glId;
    console.log(ktjID)
    const query = { ktjID: `${ktjID}` };
    let gl_doc = await GuestLecture.findById(glId);
    let user = await User.findOne(query);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!gl_doc) {
      return res.status(404).json({ message: "Guest Lecture not found" });
    }

    console.log("we are at guest",gl_doc._id);

    if (gl_doc.users.includes(user._id)) {
      return res.status(300).json({ message: "Already Registered" });
    }

    gl_doc.users.push(user._id);

    await gl_doc.save();

    user.guestLectures.push(gl_doc._id);
    // user.games.push(gameId); 


    await user.save();

    return res.status(200).json({ message: "Registered Successfully" });


  } catch (err) {
    console.log("err = " + err);
  }

}



      