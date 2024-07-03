const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const navbarSchema = new Schema(
  {
    navName: {
      type: String,
      required: true,
      trim: true,
    },
    Status: {
      type: String,
      required: true,
      trim: true,
    },
    visiblity: {
      type: Boolean,
      required: true,
    },
    isAuthenticated: {
      type: Boolean,
      required: false,
    },
    navLink: {
      type: String,
      required: true,
      trim: true,
    },

    users: {
      type: Array,
      default:[],
    },
  },
  { timestamps: true, }
);

module.exports = mongoose.model("navbar", navbarSchema);
