const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let Event = require("../models/events.model");
let User = require("../models/user.model");
let VerifyUser = require("../models/verifyuser.model");
const Team = require("../models/team.model");
const Workshop = require("../models/workshop.model");
const { sendEmail } = require("./common_controller");

const validateRegistrationInput = require("../validation/register");
const validatePreRegistrationInput = require("../validation/preregister");
const validateLoginInput = require("../validation/login");

const { OAuth2Client } = require("google-auth-library");


// controller to get user updated info if needed at some point in the web
exports.getUserInfo = async (req, res, next) => {
  try {
    const { userId } = req.body;
    // console.log(req.body,' ',req.user);
    if (userId.toString() !== req.user._id.toString()) {
      const error = new Error("Not Authorised");
      error.statusCode = 400;
      throw error;
    }
    let user = await User.findById(userId)
      .populate({
        path: "issues_Raised",
      })
      .populate({
        path: "issues_to_solve",
        populate: {
          path: "user",
          select: ["username", "email", "phone"],
        },
      })
      .populate("competitions", ["title"])
      .populate("games", ["title"]);
    
    // console.log(user)
    if (!user) {
      const error = new Error("User not found!");
      error.statusCode = 400;
      throw error;
    }
    return res.status(200).json({ success: true, userData: user });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};
exports.getIssues = async (req, res, next) => { };
// controller to change the user type from the admin panel
exports.changeUserType = async (req, res, next) => {
  // in the frontend will only allow admin and super admin to change the user type
  const { userId, userType } = req.body;
  try {
    let user = await User.findById(userId);
    if (!user) {
      let error = new Error("User Does not exist ");
      error.statusCode = 404;
      throw error;
    }
    // we may put a check for the user who is trying to change the status of other user
    // whether he/she is super admin or admin
    // else he is not allowed to change the type
    // although we will check that in  frontend but they are still other ways to hit
    // this endpoint by unauthorized user
    user.userType = userType;
    await user.save();
    return res
      .status(200)
      .json({ message: "User status Updated Successfully" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    let users = await User.find();
    return res
      .status(200)
      .json({ message: "Users fetched successfully", users: users });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

exports.getSpecificUserCount = async (req, res) => {
  console.log(req.body);

  try {
    let userCount = await User.count({ userType: req.body.userType });
    return res.status(200).json({
      message: "Users Count fetched successfully",
      userCount: userCount,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

exports.getSpecificPageUsers = async (req, res, next) => {
  const pagination = req.body.pagination ? parseInt(req.body.pagination) : 10;
  const pageNumber = req.body.page ? parseInt(req.body.page) : 1;
  try {
    let users = await User.find({ userType: req.body.userType })
      .skip((pageNumber - 1) * pagination)
      .limit(pagination);
    return res
      .status(200)
      .json({ message: "Users fetched successfully", users: users });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

exports.filterUsers = async (req, res, next) => {

  const filters = req.query;
  let key, value;

  for (var i in filters) {
    key = i
    value = filters[i]
  }

  try {

    let users = await User.find({ userType: req.body.userType, [key]: { $regex: value } })
    return res
      .status(200)
      .json({ message: "Users fetched successfully", users: users });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

exports.forgotPassword = async (req, res) => {
  const email = req.body.email;

  const query = { email: `${email}` };

  User.findOne(query)
    .then((user) => {
      const saltRounds = 10;
      let password = Math.random().toString(36).substr(2, 8);

      bcrypt.hash(password, saltRounds).then((hash) => {
        if (user != null) {
          const update = { password: `${hash}` };
          const options = {
            useFindAndModify: false,
          };

          User.findOneAndUpdate(query, update, options)
            .then(() => {
              sendEmail(
                email,
                "Your New Password",
                `Hi,
                
You recently made a request to reset your Kshitij website password. Your request for new password has been processed.

New Password: ${password}

You can now visit our website https://ktj.in to get the latest updates on our events, Guest lectures, Exhibitions.

Sent by Kshitij, IIT Kharagpur`
              )
                .then((ans) => res.json("Email sent with new password !"))
                .catch((err) => console.log(400).json("Error: " + err));
            })
            .catch((err) => res.status(400).json("Error: " + err));
        } else res.json("Validation failed, email not found !");
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.checkUserExist = async (req, res) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(200)
        .json({ message: "User does not exist", isExist: false });
    } else {
      return res
        .status(200)
        .json({ message: "User does not exist", isExist: true, user: user });
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

exports.findUser = async (req, res, next) => {
  let errors = {};
  const query = { ktjID: req.query.ktjid };
  try {
    let user = await User.findOne(query);
    if (user != null) {
      const payLoad = {
        username: user.username,
        ktjID: user.ktjID,
        _id: user._id,
        number: user.phone
      };
      return res.json({
        payLoad: payLoad,
      });
    } else {
      let error = new Error("User Does not exist ");
      error.statusCode = 404;
      throw error;
      // errors.eventKTJID = "User Not found";
      // return res.status(200).json(errors);
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

exports.userLogin = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const query = { email: req.body.email };

  User.findOne(query)

    .then((user) => {
      if (user != null) {
        const username = user.username;

        //Temporary validation [Work in Progress]
        user.validated = true;
        //End of Work in Progress

        if (user.validated === true) {
          bcrypt
            .compare(req.body.password, user.password)
            .then((result) => {
              if (result) {
                const payLoad = { username: user.username, ktjID: user.ktjID };
                const options = { expiresIn: '60d' };
                jwt.sign(
                  payLoad,
                  process.env.JWT_KEY,
                  options,
                  (err, token) => {
                    if (err) res.json("login failed !" + err);
                    else {

                      console.log(token)
                      res.cookie("token", token, {
                        // expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
                        maxAge: 2 * 30 * 24 * 60 * 60 * 1000,
                        httpOnly: true,
                        ktjID: user.ktjID,
                      });
                      // populationg issues in the user data
                      // also users data in the issues
                      // as admin users also need the email of the
                      // user whose query they are addressing
                      user = User.findOne(query)
                        .populate({
                          path: "issues_Raised",
                        })
                        .populate({
                          path: "issues_to_solve",
                          populate: {
                            path: "user",
                            select: ["username", "email", "phone"],
                          },
                        })
                        .populate("competitions", ["title"])
                        .populate("games", ["title"])
                        .then((user) => {
                          const safeData = {
                            username: user.username,
                            email: user.email,
                            gender: user.gender,
                            phone: user.phone,
                            college: user.college,
                            collegeid: user.collegeid,
                            department: user.department,
                            city: user.city,
                            state: user.state,
                            ktjID: user.ktjID,
                            teams: [],
                            events: [],
                            workshops: user.workshops,
                          };
                          let teams = "teams" in user;
                          let events = "events" in user;
                          if (teams && events) {
                            safeData.teams = user.teams;
                            safeData.events = user.events;
                          }
                          return res.json({
                            success: true,
                            userData: user,
                            safeData: safeData,
                          });
                        });
                    }
                  }
                );
              } else {
                errors.passwordsignin = "Incorrect email or password entered";
                return res.status(400).json(errors);
              }
            })
            .catch((err) => {
              errors.passwordCompare = "Error in comparing passwords";
              errors.passwordCompareError = err;
              res.status(400).json(errors + " " + err);
            });
        } else {
          errors.emailVerification =
            "Your email has not been verified. Please verify to continue";
          res.status(400).json(errors);
        }
      } else {
        errors.emailsignin = "EmailId not found";
        return res.status(404).json(errors);
      }
    })
    .catch((err) => {
      errors.findOne = "Error in finding user in database";
      errors.findOneError = err;
      res.status(400).json(errors);
    });
};

exports.googleLogin = async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  // console.log(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const googleToken = req.body.token;
  const client = new OAuth2Client(process.env.CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken: googleToken,
    audience: process.env.CLIENT_ID,
  });
  if (!ticket) {
    throw new Error("Google login failed");
  }
  if (ticket.getPayload().email_verified === false) {
    return res.status(404).json({
      message: "Email not verified",
    });
  }
  let email = ticket.getPayload().email;



  const query = { email };

  User.findOne(query)
    .then((user) => {
      if (user != null) {
        const payLoad = { username: user.username, ktjID: user.ktjID };
        const options = { expiresIn: '60d' };
        jwt.sign(payLoad, process.env.JWT_KEY, options, (err, token) => {
          if (err) res.json("login failed !" + err);
          else {
            res.cookie("token", token, {
              // expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
              maxAge: 2 * 30 * 24 * 60 * 60 * 1000,
              httpOnly: true,
              ktjID: user.ktjID,
            });
            // populationg issues in the user data
            // also users data in the issues
            // as admin users also need the email of the
            // user whose query they are addressing
            user = User.findOne(query)
              .populate({
                path: "issues_Raised",
              })
              .populate({
                path: "issues_to_solve",
                populate: {
                  path: "user",
                  select: ["username", "email", "phone"],
                },
              })
              .populate("competitions", ["title"])
              .populate("games", ["title"])
              .then((user) => {
                const safeData = {
                  username: user.username,
                  email: user.email,
                  gender: user.gender,
                  phone: user.phone,
                  college: user.college,
                  collegeid: user.collegeid,
                  department: user.department,
                  city: user.city,
                  state: user.state,
                  ktjID: user.ktjID,
                  teams: [],
                  events: [],
                };
                let teams = "teams" in user;
                let events = "events" in user;
                if (teams && events) {
                  safeData.teams = user.teams;
                  safeData.events = user.events;
                }
                return res.json({
                  success: true,
                  userData: user,
                  safeData: safeData,
                });
              });
          }
        });
      } else {
        VerifyUser.findOne({ email: email })
          .then((verifyUser) => {
            if (verifyUser) {
              return res.json({
                email_id: verifyUser.email,
                code: verifyUser._id,
              });
            } else {
              const newUser = new VerifyUser({
                email: req.body.email,
                useremailverified: true,
              });
              let emailid = newUser.email;
              newUser
                .save()
                .then(() => {
                  res.json({ email_id: emailid, code: newUser._id });
                })
                .catch((err) => res.status(400).json("Error2: " + err));
            }
          })
          .catch((err) => {
            errors.findOneError = err;
            return res.status(400).json(errors);
          });
      }
    })
    .catch((err) => {
      errors.findOneError = err;
      res.status(400).json(errors);
    });
};

exports.userPreRegister = async (req, res) => {
  const { errors, isValid } = validatePreRegistrationInput(req.body);
  try {
    if (!isValid) {
      return res.status(400).json(errors);
    }
    let verifyUser = await VerifyUser.findOne({ email: req.body.email });
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      errors.emailpresignup = "This email is already linked with an account.";

      return res.status(400).json(errors);
    } else if (verifyUser) {
      sendEmail(
        verifyUser.email,
        "Verify your email address",
        `Hi,

To start registration process, we just need to make sure this email address is yours.

To verify your email address, Click this link: https://ktj.in/#/signup?code=${verifyUser._id}&email=${verifyUser.email}

If you didn't request this link, you can safely ignore this email.

Sent by Kshitij, IIT Kharagpur`
      )
        .then(() => res.json({ email_id: verifyUser.email }))
        .catch((err) => {
          res.status(400).json(" Error1: " + err);
        });
    } else {
      const newUser = new VerifyUser({
        email: req.body.email,
        useremailverified: false,
      });
      let emailid = newUser.email;
      newUser
        .save()
        .then(() => {
          sendEmail(
            newUser.email,
            "Verify your email address",
            `Hi,
    
To start registration process, we just need to make sure this email address is yours.
    
To verify your email address, Click this link: https://ktj.in/#/signup?code=${newUser._id}&email=${newUser.email}
    
If you didn't request this link, you can safely ignore this email.
    
Sent by Kshitij, IIT Kharagpur`
          )
            .then(() => res.json({ email_id: emailid }))
            .catch((err) => {
              console.log("Hi", err);
              res.status(400).json("Error1: " + err);
            });
        })
        .catch((err) => res.status(400).json("Error2: " + err));
    }
  } catch (err) {
    res.status(400).json("Error4: " + err);
  }
};

exports.userGooglePreRegister = async (req, res) => {
  const { errors, isValid } = validatePreRegistrationInput(req.body);
  try {
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const googleToken = req.body.token;
    const client = new OAuth2Client(process.env.CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.CLIENT_ID,
    });
    if (!ticket) {
      throw new Error("Google login failed");
    }
    if (ticket.getPayload().email_verified === false) {
      return res.status(404).json({
        message: "Email not verified",
      });
    }
    let email = ticket.getPayload().email;






    let verifyUser = await VerifyUser.findOne({ email });
    let user = await User.findOne({ email });

    if (user) {
      return res.json({ user: user });
    } else if (verifyUser) {
      res.json({ email_id: verifyUser.email, code: verifyUser._id });
    } else {
      const newUser = new VerifyUser({
        email,
        useremailverified: true,
      });
      let emailid = newUser.email;
      newUser
        .save()
        .then(() => {
          res.json({ email_id: emailid, code: newUser._id });
        })
        .catch((err) => res.status(400).json("Error2: " + err));
    }
  } catch (err) {
    res.status(400).json("Error4: " + err);
  }
};

exports.userRegister = async (req, res) => {

  // console.log(req.body)
  const { errors, isValid } = validateRegistrationInput(req.body);
  try {
    if (!isValid) {
      return res.status(400).json(errors);
    }
    // let code = await VerifyUser.findById(req.body.code);
    // console.log(code);
    // if (code == null) {
    //   errors.email = "Unauthorized access";
    //   return res.status(400).json(errors);
    // }

    let user = await User.findOne({ email: req.body.email });

    if (user) {
      errors.email = "This email is already linked with an account.";
      return res.status(400).json(errors);
    } else {
      user = await User.findOne({ phone: req.body.phone });
      if (user) {
        errors.phone = "This phone number is already linked with an account";
        return res.status(400).json(errors);
      } else {
        let ktjID =
          "24KTJ" +
          req.body.username.substr(0, 3).toUpperCase() +
          Math.floor(Math.random() * 899999 + 100000).toString(10);
        const key = Math.floor(Math.random() * 89999 + 10000);
        let user_check = await User.findOne({ ktjID: `${ktjID}` });
        while (user_check != null) {
          ktjID =
            "24KTJ" +
            req.body.username.substr(0, 3).toUpperCase() +
            Math.floor(Math.random() * 899999 + 100000).toString(10);
          user_check = await User.findOne({ ktjID: `${ktjID}` });
        }

        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          gender: req.body.gender.toUpperCase(),
          phone: req.body.phone,
          college: req.body.college,
          collegeid: req.body.collegeid,
          department: req.body.department,
          city: req.body.city,
          state: req.body.state,
          validated: false,
          key: key,
          ktjID: ktjID,
        });

        const saltRounds = 10;

        bcrypt
          .hash(req.body.password, saltRounds)
          .then((hash) => {
            newUser.password = hash;

            const query = { email: newUser.email };

            const update = { useremailverified: true };
            const options = {
              useFindAndModify: false,
            };

            newUser
              .save()
              .then(() => {
                sendEmail(
                  newUser.email,
                  "Registration Successful for Kshitij 2024",
                  `Greetings from Kshitij,
                
Your registration is now complete. We welcome you to be a part of Kshitij.
Your ktj-ID is: ${ktjID}. Please don't share your ktjID with others. 

You can now visit our website https://ktj.in to get the latest updates on our Events, Guest lectures, Exhibitions. You can register for our competitions, workshops, megashows, technology summits and other events using this website. Stay informed by checking our website and make use of this exciting opportunity to the fullest, by participating in our events.

Hope to see you soon in our upcoming events.

Regards,
Kshitij Team`
                )
                  .then(() => {
                    VerifyUser.findOneAndUpdate(query, update, options)
                      .then(() => {
                        console.log("updated email verified key");
                      })
                      .catch((err) => res.status(400).json("Error: " + err));
                    res.json({ ktjID: ktjID });
                  })
                  .catch((err) => {
                    console.log("Hi", err);
                    res.status(400).json("Error1: " + err);
                  });
              })
              .catch((err) => res.status(400).json("Error2: " + err));
          })
          .catch((err) => res.status(400).json("Error3: " + err));
      }
    }
  } catch (err) {
    res.status(400).json("Error4: " + err);
  }
};

exports.userUpdatePassword = (req, res) => {
  const ktjID = req.body.ktjID;
  const password = req.body.password;
  const key = req.body.key;

  const query = { ktjID: `${ktjID}` };

  User.findOne(query)
    .then((user) => {
      if (user != null) {
        if (user.validated == true && user.key == key) {
          const update = { password: `${password}` };
          const options = {
            useFindAndModify: false,
          };

          User.findOneAndUpdate(query, update, options)
            .then(() => res.json("updated !"))
            .catch((err) => res.status(400).json("Error: " + err));
        } else res.json("updation failed !");
      } else res.json("updation failed !");
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.userUpdateEmail = (req, res) => {
  const ktjID = req.body.ktjID;
  const email = req.body.email;

  const query = { ktjID: `${ktjID}` };
  const update = { email: `${email}`, validated: false };
  const options = {
    useFindAndModify: false,
  };

  User.findOneAndUpdate(query, update, options)
    .then(() => res.json("updated !"))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.userValidate = (req, res) => {
  const ktjID = req.body.ktjID;
  const key = req.body.key;
  const newkey = Math.floor(Math.random() * 89999 + 10000);

  const query = { ktjID: `${ktjID}` };

  User.findOne(query)
    .then((user) => {
      if (user != null) {
        if (user.key === key || 1) {
          const update = { validated: true, key: `${newkey}` };
          const options = {
            useFindAndModify: false,
          };

          User.findOneAndUpdate(query, update, options)
            .then(() => res.json("validated !"))
            .catch((err) => res.status(400).json("Error: " + err));
        } else res.json("Validation failed");
      } else res.json("Validation failed, user not found !");
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.userDelete = (req, res) => {
  const username = req.body.username;

  const query = { username: `${username}` };

  User.findOneAndDelete(query)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.userWorkshopReg = async (req, res) => {
  const ktjID = req.body.ktjID;
  const workshop = req.body.title;

  const query = { ktjID: `${ktjID}` };
  const options = {
    useFindAndModify: false,
  };

  try {
    let workshop_doc = await Workshop.findOne({ title: `${workshop}` });
    let user = await User.findOne(query);

    if (workshop_doc == null) return res.json("Select a proper workshop");
    else if (user != null) {
      let check = "workshops" in user;
      if (check) {
        let workshops = user.workshops;
        const index = workshops.indexOf(`${workshop}`);
        if (index < 0) {
          user.workshops.push(`${workshop}`);
          workshop_doc.users.push(`${ktjID}`);
          await user.save();
          await workshop_doc.save();
          return res.json("Registered");
        } else return res.json("Already registered");
      } else {
        let workshops = [`${workshop}`];
        const update = { workshops: `${workshop}` };
        workshop_doc.users.push(`${ktjID}`);

        user = await user.findOneAndUpdate(query, update, options);
        await workshop_doc.save();
        return res.json("Registered");
      }
    } else return res.json("No user found");
  } catch (err) {
    console.log("err = " + err);
  }
};

exports.userWorkshopDereg = async (req, res) => {
  const ktjID = req.body.ktjID;
  const workshop = req.body.title;

  const query = { ktjID: `${ktjID}` };

  try {
    let workshop_doc = await Workshop.findOne({ title: `${workshop}` });
    let user = await User.findOne(query);

    if (workshop_doc == null) return res.json("Error: No such event");
    else if (user != null) {
      let check = "workshops" in user;

      if (check) {
        check = user.workshops.includes(`${workshop}`);
        if (check) {
          user.workshops.pull(`${workshop}`);
          workshop_doc.users.pull(`${ktjID}`);

          await user.save();
          await workshop_doc.save();
          return res.json("Deregistered");
        } else return res.json("not registered");
      } else return res.json("not registered");
    } else return res.json("failed");
  } catch (err) {
    console.log("err = " + err);
  }
};

exports.userEventReg = async (req, res) => {
  try {
    let ktjID = req.body.ktjID;
    const event = req.body.title;

    const query = { ktjID: `${ktjID}` };
    const options = {
      useFindAndModify: false,
    };

    let teamID =
      "24KTJ" +
      event.substr(0, 3).toUpperCase() +
      ktjID[5] +
      Math.floor(Math.random() * 899999 + 100000).toString(10);

    let team_check = await Team.findOne({ ktjID: `${teamID}` });
    while (team_check != null) {
      teamID =
        "24KTJ" +
        event.substr(0, 3).toUpperCase() +
        ktjID[5] +
        Math.floor(Math.random() * 899999 + 100000).toString(10);
      team_check = await Team.findOne({ ktjID: `${teamID}` });
    }

    let event_doc = await Event.findOne({ title: `${event}` });
    let user = await User.findOne(query);

    let members = [ktjID];
    let captain = ktjID;
    ktjID = teamID;
    const team = { ktjID, captain, members, event };
    const newTeam = new Team(team);

    const reg_team = await Team.findOne({ members: members });
    if (reg_team != null && reg_team.event == event)
      res
        .status(200)
        .json("Already registered with teamID : " + reg_team.ktjID);
    else if (event_doc == null) return res.json("Select a proper event");
    else if (user != null) {
      let check = "events" in user;
      if (check) {
        let events = user.events;
        const index = events.indexOf(`${event}`);
        if (index < 0) {
          user.events.push(`${event}`);
          user.teams.push(ktjID);
          event_doc.users.push(`${ktjID}`);
          await user.save();
          await event_doc.save();
          await newTeam.save();
          return res.json("Registered");
        } else return res.json("Already registered");
      } else {
        let events = [`${event}`];
        const update = { events: `${event}`, teams: `${ktjID}` };
        event_doc.users.push(`${ktjID}`);

        user = await user.findOneAndUpdate(query, update, options);
        await event_doc.save();
        await newTeam.save();
        return res.json("Registered");
      }
    } else return res.json("No user found");
  } catch (err) {
    console.log("err = " + err);
  }
};

exports.userEventDereg = async (req, res) => {
  try {
    const ktjID = req.body.ktjID;
    const teamID = req.body.teamID;
    const event = req.body.title;

    const query = { ktjID: `${ktjID}` };

    const team = await Team.findOne({ ktjID: `${teamID}` });
    let event_doc = await Event.findOne({ title: `${event}` });
    let user = await User.findOne(query);

    if (team == null) return res.json("Error: Not registered");
    else if (event_doc == null) return res.json("Error: No such event");
    else if (user != null) {
      let check = "events" in user;
      let t_check = "teams" in user;
      if (check && t_check) {
        check = user.events.includes(`${event}`);
        t_check = user.teams.includes(`${teamID}`);
        if (check && t_check) {
          user.events.pull(`${event}`);
          user.teams.pull(`${teamID}`);
          event_doc.users.pull(`${teamID}`);

          await user.save();
          await event_doc.save();
          await Team.findOneAndDelete({ ktjID: `${teamID}` });
          return res.json("Deregistered");
        } else return res.json("not registered");
      } else return res.json("not registered");
    } else return res.json("failed");
  } catch (err) {
    console.log("err = " + err);
  }
};

exports.workshopUserDetails = async (req, res) => {
  const errors = {};
  const title = req.body.title;

  try {
    let details = [];
    let query = { title: `${title}` };
    let event = await Workshop.findOne(query);
    let users = event.users;
    let j = 0;
    for (j = 0; j < users.length; ++j) {
      let ktjID = users[j];
      query = { ktjID: `${ktjID}` };
      let user = await User.findOne(query);
      let username = user.username;
      let phone = user.phone;
      let email = user.email;
      details.push({ ktjID, username, phone, email });
    }
    res.json(details);
  } catch (error) {
    errors.error = "Internal server error";
    console.log("error is" + error);
    res.status(404).json(errors);
  }
};

exports.getUserCount = async (req, res, next) => {
  try {
    let count = await User.count();
    return res.status(200).json({ success: true, userCount: count });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

exports.getPaidCount = async (req, res, next) => {
  try {
    let count = await User.count({paid:"yes"});
    return res.status(200).json({ success: true, userCount: count });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

exports.updatePay = async (req, res) => {
  try {
    const {pay, ktjid } = req.body;
    if(!pay || !ktjid)
    return res.status(401).json({ success: true, message :"form incomplete" });

    let user = await User.findOne({ktjID:ktjid});

    if(user)
    {
      user.paid = pay;
      await user.save();
      return res.status(200).json({ success: true, message :"updated"});
    }
    else
    return res.status(404).json({ success: false, message :" could not update" });
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message :"server error" });
  }
};

exports.getPay = async (req, res, next) => {
  try {
    const { ktjid } = req.body;
    if(!ktjid)
    return res.status(401).json({ success: true, message :"form incomplete" });

    let user = await User.findOne({ktjID:ktjid});

    if(user)
    return res.status(200).json({ success: true, paid : user.paid });
    else
    return res.status(404).json({ success: false, message :" could not update" });
    
  } catch (error) {
    console.log(error)
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

exports.updateUserProfile = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      gender,
      department,
      city,
      state,
      college,
      collegeid,
    } = req.body;
    let user = await User.findOne({ email: email })
      .populate({
        path: "issues_Raised",
      })
      .populate({
        path: "issues_to_solve",
        populate: {
          path: "user",
          select: ["username", "email", "phone"],
        },
      })
      .populate("competitions", ["title"])
      .populate("games", ["title"]);


    if (!user) {
      let error = new Error("User Does not exist ");
      error.statusCode = 404;
      throw error;
    }
    if (req.user._id.toString() != user._id.toString()) {
      let error = new Error("Not Authorized!!");
      error.statusCode = 401;
      throw error;
    }
    if (user.phone != phone) {
      let phone_user = await User.findOne({ phone: phone });
      if (phone_user) {
        let error = new Error("Phone No Already Linked with an ID ");
        error.statusCode = 412;
        throw error;
      }
    }
    user.username = name;
    user.phone = phone;
    user.gender = gender;
    user.department = department;
    user.city = city;
    user.state = state;
    user.college = college;
    user.collegeid = collegeid;
    await user.save();
    return res
      .status(200)
      .json({ message: "User updated Successfully", userData: user });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

exports.userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (decoded) {
      let ktjID = decoded.ktjID;
      if (ktjID == null || ktjID == undefined || ktjID == "") {
        return res.status(407).json({
          success: false
        });
      }
      console.log(ktjID);
      let first_two_digits = parseInt(ktjID.substring(0, 2));
      console.log(first_two_digits, typeof (first_two_digits));

      if (first_two_digits < 23) {
        return res.status(407).json({
          success: false
        });
      }
      return res.status(200).json({ success: true });
      next()
    } else {
      return res.status(407).json({
        success: false
      });
    }
  }
  catch (error) {
    if (!error.statusCode) {
      error.statusCode = 412;
    }
    next(error);
  }
};


exports.getUserbyId = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming the user ID is passed as a route parameter

    // Find the user by ID in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user data
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
  ;






