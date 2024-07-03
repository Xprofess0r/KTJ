const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const singleSponsorSchema = new Schema({
  sponsorName: {
    type: String,
  },
  sponsorImg: {
    type: String,
    trim: true,
  },
  linktoWebsite: {
    type: String,
    trim: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
});
const sponsorSchema = new Schema(
  {
    sponsorType: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
    },
    sponsors: [singleSponsorSchema],
    priority: {
      type: Number,
      default: 1,
    },
    order: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sponsor", sponsorSchema);
