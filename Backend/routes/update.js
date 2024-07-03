const router = require("express").Router();

let User = require("../models/user.model");
const auth = require("../Auth/auth_middleware");

router.route("/password").post(auth, (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const key = req.body.key;

  const query = { username: `${username}` };

  User.findOne(query)
    .then((user) => {
      if (user.length >= 1) {
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
});

router.route("/email").post(auth, (req, res) => {
  const username = req.body.username;
  const email = req.body.email;

  const query = { username: `${username}` };
  const update = { email: `${email}`, validated: false };
  const options = {
    useFindAndModify: false,
  };

  User.findOneAndUpdate(query, update, options)
    .then(() => res.json("updated !"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
