const User = require("../models/user.model");
let Workshop = require("../models/workshop.model");
const { getFilesPath, clearImage } = require("../utils/utils");
const path = require("path");
const activityController = require("./activity_controller");

const { join } = require("path");

exports.getOnlyWorkshops = async (req, res) => {
  try {
    let workshops = await Workshop.find();

    workshops = workshops.map((ws) => {
      return {
        active: ws.active,
        company: ws.company,
        createdAt: ws.createdAt,
        _id: ws._id,
        description: ws.description,
        imageUrl: ws.imageUrl,
        joining_link: ws.joining_link,
        registration: ws.registration,
        time: ws.time,
        title: ws.title,
      };
    });

    let order_arr = [3, 7, 1, 4, 6, 5, 2, 8];
    let newworkshops = order_arr
      .map((e) => workshops[e - 1])
      .filter((e) => e !== undefined);

    return res.status(200).json({ workshops});
  } catch (error) {
    console.log("err", error);
    return res.status(400).json("Error", error);
  }
};

exports.getWorkshops = async (req, res) => {
  try {
    let workshops = await Workshop.find().populate("users", [
      "email",
      "username",
      "ktjID",
    ]);
    return res.status(200).json({ workshops: workshops });
  } catch (error) {
    console.log("err", error);
    return res.status(400).json("Error", error);
  }
};
exports.deleteWorkshop = async (req, res, next) => {
  // console.log(req.body);
  const id = req.body._id;

  try {
    let workshop = await Workshop.findById(id);
    if (!workshop) {
      return res.status(404).json({ message: "Workshop not found" });
    }
    await workshop.delete();
    await activityController.createActivity(
      {
        userId: req.userIdForActivity,
        description: "Deleted workshop : " + workshop.title,
      },
      next
    );
    return res.status(200).json({ message: "Workshop Deleted successfully" });
  } catch (error) {
    console.log("err", error);
    res.status(400).json({ error: error });
  }
};

exports.createWorkshop = async (req, res, next) => {
  const { title, company, description, joining_link, imageUrl } = req.body;
  const time = new Date();

  try {

    let workshop = new Workshop({
      title,
      company,
      description,
      imageUrl,
      joining_link,
      time,
    });
    await workshop.save();
    await activityController.createActivity(
      {
        userId: req.userIdForActivity,
        description: "Created Workshop :" + title,
      },
      next
    );
    return res
      .status(200)
      .json({ message: "Workshop created successfully", workshop: workshop });
  } catch (error) {
    console.log(error, "err");
    return res.status(400).json({ error: error });
  }
};
exports.updateWorkshop = async (req, res, next) => {
  const { title, company, description, joining_link, _id, imageUrl, active, registration } = req.body;

  try {

    let workshop = await Workshop.findById(_id);
    if (!workshop) {
      return res
        .status(404)
        .json({ message: "Workshop with the given id doesn't exist " });
    }
    workshop.title = title;
    workshop.company = company;
    workshop.description = description;
    workshop.joining_link = joining_link;
    workshop.active = active;
    workshop.registration = registration;
    workshop.imageUrl = imageUrl;

    await workshop.save();
    await activityController.createActivity(
      {
        userId: req.userIdForActivity,
        description: "Updated Workshop :" + title,
      },
      next
    );
    return res
      .status(200)
      .json({ message: "Workshop Updated successfully", workshop: workshop });
  } catch (error) {
    console.log(error, "err");
    return res.status(400).json({ error: error });
  }
};

exports.userwsReg = async (req, res) => {

  try {
    let ktjID = req.body.ktjID;
    let wsId = req.body.wsId;
    const query = { ktjID: `${ktjID}` };
    let ws_doc = await Workshop.findById(wsId);
    let user = await User.findOne(query);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!ws_doc) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    if (ws_doc.users.includes(user._id)) {
      return res.status(404).json({ already_present: true, message: "Already Registered" });
    }

    ws_doc.users.push(user._id);

    await ws_doc.save();

    user.workshops.push(ws_doc._id);

    await user.save();

    return res.status(200).json({ message: "Registered Successfully" });


  } catch (err) {
    console.log("err = " + err);
  }

};

exports.userwsdeReg = async (req, res) => {
  try {
    let ktjID = req.body.ktjID;
    const workshop = req.body.title;
    const query = { ktjID: `${ktjID}` };
    let ws_doc = await Workshop.findOne({ title: `${workshop}` })
    let user = await User.findOne(query);

    if (ws_doc == null) return res.json("Select a proper Workshop");
    else if (user != null) {

      let ws = user.workshops;
      const index = ws.indexOf(`${workshop}`);
      if (index >= 0) {
        user.workshops.splice(index, 1);
        let userIndex = ws_doc.users.indexOf(`${ktjID}`);
        ws_doc.users.splice(userIndex, 1);
        await user.save();
        await ws_doc.save();
        return res.json("De-Registered Successfully");

      } else return res.json("Not Registered");

    } else return res.json("User Not Found");

  } catch (err) {
    console.log("err = " + err);
  }
}
















