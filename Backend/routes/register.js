const router = require("express").Router();
const bcrypt = require("bcrypt");

let User = require("../models/user.model");

const sEmail = require("./email");

router.route("/").post((req, res) => {
  // const username = req.body.username;
  // const email = req.body.email;
  // const textpassword = req.body.password;



  const {
    username,
    email,
    gender,
    phone,
    college,
    clgid,
    dep,
    city,
    state,
    textpassword,
  } = req.body;

  const validated = false;
  const key = Math.floor(Math.random() * 89999 + 10000);

  const saltRounds = 10;

  bcrypt
    .hash(textpassword, saltRounds)
    .then((hash) => {
      const password = hash;
      const newUser = new User({
        username,
        email,
        gender,
        phone,
        college,
        clgid,
        dep,
        city,
        state,
        password,
        validated,
        key,
      });

      newUser
        .save()
        .then(() => {
          // sEmail
          //   .sendEmail(email, key)
          //   .then(() => )
          //   .catch((err) => res.status(400).json("Error: 2" + err));
          res.json("User added!")
        })
        .catch((err) => res.status(400).json("Error:1 " + err));
    })
    .catch((err) => res.status(400).json("Error:babai " + err));
});

module.exports = router;
