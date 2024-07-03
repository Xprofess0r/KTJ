const User = require("../models/user.model");
const Event = require("../models/events.model");
const { clearImage, getFilesPath } = require("../utils/utils");
const path = require("path");
const activityController = require("./activity_controller");
const { events } = require("../models/user.model");
exports.deleteEvent = async (req, res, next) => {
  let eventId = req.body._id;
  // console.log(req.body);
  try {
    let event = await Event.findById(eventId);
    if (!event) {
      // return res.status(404).json({ message: "Event does not exists" });
      let error = new Error("Event does not exit ");
      error.statusCode = 404;
      throw error;
    }
    for (let p of event.guestProfilePhotos) {
      let filepath = path.join(__dirname, "..", p);
      clearImage(filepath);
    }
    await event.delete();
    await activityController.createActivity(
      {
        userId: req.userIdForActivity,
        description: "Deleted event " + event.title,
      },
      next
    );
    return res.status(200).json({ message: "Event deleted Successfully" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

exports.getEvents = async (req, res, next) => {
  let category = req.query.category;
  try {
    let events = [];
    if (category) events = await Event.find({ category: category }).populate("users");
    else events = await Event.find().populate("users");

    return res.status(200).json({ events: events });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};



exports.createEvent = async (req, res, next) => {
  // console.log(req.body);

  const title = req.body.title;
  const guests = req.body.guests || [];
  const category = req.body.category;
  const meeting_link = req.body.meeting_link || " ";
  let guestProfilePhotos = req.body.guest_profile_photos;
  const headKtjId = req.body.headKtjId ? req.body.headKtjId : null;
  if (req.files) {
    let guestProfilePhotos = req.files.map((file) => {
      return file.path.replace("\\", "/");
    });
  }

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
    let event = await Event.findOne({ title: `${title}` });
    if (event == null) {
      const newEvent = new Event({
        title,
        category,
        guests,
        meeting_link,
        headKtjId,
        headObjectId,
      });
      await newEvent.save();
      await activityController.createActivity(
        {
          userId:req.userIdForActivity,
          description: "Created event : " + newEvent.title,
        },
        next
      );
      return res
        .status(200)
        .json({ message: "Event created Successfully", event: newEvent });
    } else {
      // 409 for the conflict issues when resource we are
      // creating already present ;
      let error = new Error(
        "Event with this title already exits ,Try using a different title "
      );
      error.statusCode = 409;
      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};


exports.updateEvent = async (req, res, next) => {
  let title = req.body.title;
  let meeting_link = req.body.meeting_link;
  let guests = req.body.guests;
  let guestProfilePhotos = req.body.guest_profile_photos;
  // if (req.files) {
    //   guestProfilePhotos = getFilesPath(req.files);
    // }
    let category = req.body.category;
    let eventId = req.body._id;
    let active = req.body.active;
    let registration = req.body.registration;
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
    let event = await Event.findById(eventId);
    if (!event) {
      let error = new Error("Event Not found");
      error.statusCode = 404;
      throw error;
    }
    event.title = title;
    event.meeting_link = meeting_link;
    event.guests = guests;
    event.category = category;
    event.guestProfilePhotos = guestProfilePhotos;
    event.headKtjId = headKtjId;
    event.headObjectId = headObjectId;
    event.active = active;
    event.registration = registration;

    // event.guestProfilePhotos = guestProfilePhotos.map((photo, index) => {
    //   // if the user uploaded a new image then we will delete the previous one
    //   if (event.guestProfilePhotos[index] !== photo) {
    //     clearImage(path.join(__dirname, "..", event.guestProfilePhotos[index]));
    //   }
    //   return photo;
    // });
    await event.save();
    await activityController.createActivity(
      {
        userId: req.userIdForActivity,
        description: "Updated event : " + event.title,
      },
  
    );
    return res
      .status(200)
      .json({ message: "Event details updated successfully", event: event });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};
