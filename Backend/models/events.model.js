const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    guests: [{ type: Object }],
    category: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    meeting_link: {
      type: String,
    },
    guestProfilePhotos: [{ type: String }],
    users: {
      type: Array,
      default: [],
    },
    headKtjId: {
      type: String,
      required: false,
    },
    headObjectId: {
      type: String,
      required: false,
    },
    // whether registrations are open or closed
    registration: {
      type: Boolean,
      default: false,
    },
    // visible on the webpage or not
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
