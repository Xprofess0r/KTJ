const User = require("../models/user.model");
let Interactive = require("../models/interactive.model");

exports.userwsReg = async (req, res) => {
  try {
    let number = req.body.number;
    let ws_doc = await Interactive.findOne({ number: number });
    // console.log(ws_doc);
    let user = await User.findById(req.body.id);
    // console.log(user);
    if (ws_doc == null) return res.status(200).json("Select a proper Workshop");

    if (!ws_doc.users.includes(req.user)) {
      user.interactive.push(number);
      ws_doc.users.push(req.user);
      await user.save();
      await ws_doc.save();
      return res.json({message:"Registered Successfully", user:user});
    } else return res.json("Already Registered");
  } catch (err) {
    console.log("err = " + err);
  }
};

exports.getInteractiveUsers = async (req, res, next) => {
  try {
    let iu = await Interactive.find().populate("users", [
      "email",
      "username",
      "ktjID",
      "phone",
      "gender",
      "college",
      "department",
      "city",
      "state",
    ]);

    return res.status(200).json({ iu: iu });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

exports.getIU = async (req, res, next) => {
  try {
    let iu = await Interactive.find().select(["-users"]);

    return res.status(200).json({ iu: iu });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};
exports.addSession = async (req, res) => {
  try {
    const { number, title, joiningLink, imageUrl } = req.body;

    // Create a new workshop session
    const newSession = await Interactive.create({
      number,
      title,
      joiningLink,
      imageUrl,
    });

    // Save the workshop session to the database
    // await newSession.save();

    return res.status(201).json({ success: true, data: newSession });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
};

exports.deleteSession = async (req, res) => {
  try {
    const sessionId = req.params.id;

    // Check if the session exists
    const session = await Interactive.findById(sessionId);
    if (!session) {
      return res.status(404).json({ success: false, error: 'Session not found' });
    }

    // Delete the session
    await session.remove();

    return res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
};