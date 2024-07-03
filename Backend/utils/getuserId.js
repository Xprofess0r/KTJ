const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports = async (req, res,next) => {

    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_KEY);
      await User.findOne({ ktjID: decoded.ktjID }, (err, data) => {
          req.userIdForActivity=data._id;
          req.username=data.username;
          next();
      });
};

