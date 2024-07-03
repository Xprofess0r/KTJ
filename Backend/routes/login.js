const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let User = require("../models/user.model");

router.route("/").post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const query = { username: `${username}` };

  User.findOne(query)
    .then((user) => {
      if (user.length >= 1) {
        const id = user.id;
        if (user.validated === true) {
          bcrypt
            .compare(password, user.password)
            .then(function (result) {
              if (result) {
                const payLoad = { username: `${username}`, id: `${id}` };
                const options = { expiresIn: 7200 };

                jwt.sign(
                  payLoad,
                  process.env.JWT_KEY,
                  options,
                  (err, token) => {
                    if (err) res.json("Login failed at jwt");
                    else
                      res.json({
                        message: "Login Authentication successful",
                        token: "Bearer " + token,
                      });
                  }
                );
              }
            })
            .catch((err) => res.status(400).json("Error: " + err));
        } else res.json("login failed at validated is false !");
      } else res.json("login failed  at short username!");
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
