const nodemailer = require("nodemailer");
const activityController = require("./activity_controller");
const Models = require("../utils/models");
const emailData = require("../models/emaildata.model");

exports.sendEmail = async (to, subject, text, track = false) => {
  let transporter = nodemailer.createTransport({
    service:'gmail',// use SSL
    auth: {
      user: process.env.EMAIL_USER,                      
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  try {

    
    let info = await transporter.sendMail({
      from: `"Kshitij, IIT Kharagpur"<${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      text: text,
    });
    if (Array.isArray(info.rejected) && info.rejected.length) return false;
    if (track) {
      const newEmaildata = new emailData({
        sender: process.env.EMAIL_USER,
        privateRecipient: to,
        subject: subject,
        emailbody: text,
      });
      newEmaildata.save().catch((err) => console.error(err));
    }


  } catch (err) {
    console.log("Error" + err);
  }
  return true;
};

exports.sendEmailToAllusers = async (req, res, next) => {
  const { users, subject, body } = req.body;
  // console.log(req.body, "body");
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  try {
    transporter.verify((error, success) => {
      if (error) {
        let error = new Error(
          "Unable to verify SMTP user , check you credentials and try again "
        );
        throw error;
      }
    });
    let info = await transporter.sendMail({
      from: `"Kshitij, IIT Kharagpur"<${process.env.EMAIL_USER}>`,
      to: users[0],
      bcc: users,
      subject: `${subject}`,
      html: body,
    });
    if (Array.isArray(info.rejected) && info.rejected.length) {
      let error = new Error("Email not send to " + user);
      throw error;
    }
    await activityController.createActivity(
      {
        userId: req.userIdForActivity,
        description: "Send Mail to " + users.join(","),
      },
      next
    );
    //Tracking mail send to common users

    // console.log(users);

    let sender = `${process.env.EMAIL_USER}`;
    let commonRecipients = users;
    let emailsubject = `${subject}`;
    let emailbody = body;

    const newEmaildata = new emailData({
      sender: sender,
      commonRecipients: commonRecipients,
      subject: emailsubject,
      emailbody: emailbody,
      senderName: req.username,
    });

    newEmaildata
      .save()
      .then(() => {
        // console.log("Email data save")
      })
      .catch((err) => console.error(err));

    return res.status(200).json({ message: "Email send successfully" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};
// update the active and registration status of events

exports.updateStatus = async (req, res, next) => {
  const { status, eventId, type, eventType } = req.body;
  // type -- active, registration
  // eventType is Game,Event,Competition,Workshop,GuestLecture,Sponsor
  // depending upon the call
  try {
    let event = await Models[eventType].findById(eventId);
    event[type] = status;
    await event.save();
    return res
      .status(201)
      .json({ message: eventType + " updated Successfully", status: status });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

exports.getMails = async (req, res) => {
  const pagination = req.body.pagination ? parseInt(req.body.pagination) : 10;
  const pageNumber = req.body.page ? parseInt(req.body.page) : 1;

  try {
    const emails = await emailData
      .find()
      .sort({ createdAt: -1 })// getting lastest emails first 
      .skip((pageNumber - 1) * pagination)
      .limit(pagination);
    return res
      .status(201)
      .json({ message: " Emails fetch Successfully", emails: emails });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

exports.getMailsCount = async (req, res) => {
  try {
    const count = await emailData.count();

    return res
      .status(201)
      .json({ message: " Emails fetch Successfully", emailsCount: count });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};
