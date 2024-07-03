const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const scheduledSchema = new Schema({
  type: {
    type: String,
  },
  title: {
    type: String,
  },
  startingTime: {
    type: String,
  },
  endingTime: {
    type: String,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  sponsImageUrl: {
    type: String,
  },

  joiningLink: {
    type: String,
  },
  joiningLinkText: {
    type: String,
  },

  date: {
    type: String,
  },

  
});

module.exports = mongoose.model("Schedule", scheduledSchema);