const router = require("express").Router();

const sEmail = require("./email");

router.route("/").post(async (req, res) => {
  const email = req.body.email;

  sEmail
    .sendEmail(email, key)
    .then(() => res.json("Email sent with key !"))
    .catch((err) => console.log(400).json("Error: " + err));
});

module.exports = router;
