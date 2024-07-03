const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").post((req, res) => {
  const username = req.body.username;
  const key = req.body.key;
  const newkey = Math.floor(Math.random() * 89999 + 10000);

  const query = { username: `${username}` };

  User.findOne(query)
    .then((user) => {
      if (user.length) {
        if (user.key == key) {
          const update = { validated: true, key: `${newkey}` };
          const options = {
            useFindAndModify: false,
          };

          User.findOneAndUpdate(query, update, options)
            .then(() => res.json("validated !"))
            .catch((err) => res.status(400).json("Error: " + err));
        } else res.json("Validation failed");
      } else res.json("Validation failed");
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
