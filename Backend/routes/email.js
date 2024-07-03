const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();

const Multer = require("../utils/multer");
const emailController = require("../Controllers/common_controller.js");
const auth = require("../Auth/auth_middleware");
const is_admin = require("../Auth/is_admin");
const getUserId= require('../utils/getuserId')

router.post("/sendMail", auth, is_admin, getUserId,emailController.sendEmailToAllusers);
router.post("/getMails", auth, is_admin, getUserId,emailController.getMails);
router.get("/getMailsCount", auth, is_admin, getUserId,emailController.getMailsCount);
module.exports = router;

exports.sendEmail = async (email, key) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    // host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "trainstatusteam@gmail.com",
      pass: "DumbV@123",
    },
  });

  let info = await transporter
    .sendMail({
      from: "trainstatusteam@gmail.com",
      to: email,
      subject: "Validation Request",
      text: `Your validation key : "${key}".`,
    })
    .then(() => console.log("email success !"))
    .catch((err) => console.log("Error: " + err));
};


