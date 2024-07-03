const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const guestSchema = new Schema(
  {
    guestName: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      // required: true,
      trim: true,
    },
    lectureDescription: {
      type: String,
      required: true,
      trim: true,
    },

    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    headKtjId: {
      type: String,
      required: false,
    },
    headObjectId: {
      type: String,
      required: false,
    },
    registration: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    registrationLink: {
      type: String,
      trim: true,
    },
    youtubeLink: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("guestLecture", guestSchema);
