const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RegNewsLetter = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
});

const regNewsletter = mongoose.model("NewsLetter", RegNewsLetter);

module.exports = regNewsletter;
