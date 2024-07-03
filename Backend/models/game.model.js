const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    deadline: {
      type: String,
    },
    prize_money: {
      type: Number,
      min: 0,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    registration_link: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
    },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    teams: [{ type: Schema.Types.ObjectId, ref: "Gameteam" }],
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
    max:{
      type:String,
      required:true
    },
    min:{
      type:String,
      required:true
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", gameSchema);
