const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const IssueSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    head: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    eventType: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    eventName: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Issue = mongoose.model("Issue", IssueSchema);

module.exports = Issue;
