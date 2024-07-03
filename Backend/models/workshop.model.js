const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// const deliveredSchema = new Schema({ name: String, profession: String });
const workshopSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    company: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },

    joining_link: {
      type: String,
      trim: true,
    },
    time: {
      type: Date,
    },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    registration: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Workshop", workshopSchema);
