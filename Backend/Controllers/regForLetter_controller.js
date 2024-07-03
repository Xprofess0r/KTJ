let regNewsletter = require("../models/regNewsletter.model");

exports.emailAdd = async (req, res, next) => {
  const email = req.body.email;

  try {
    let user = await regNewsletter.findOne({ email: email });

    if (user == null) {
      const newRegistration = new regNewsletter({ email });
      await newRegistration.save();
      return res
        .status(200)
        .json({ message: "Successfully Added to the newsletter" });
    } else {
      let error = new Error("Email Already added!");
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

exports.getRegisteredUsers = async (req, res, next) => {
  try {
    let users = await regNewsletter.find();
    return res.status(200).json({ users: users });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};
