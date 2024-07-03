const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const competitionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    prize_money: {
      type: Number,
      min: 0,
      required: true,
    },
    deadline:{
      type: Date,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    posterUrl: {
      type: String,
      trim: true,
    },
    max:{
      type:Number,
      required:true
    },
    min:{
      type:Number,
      required:true
    },
    sponsors: [
      {
        sponsorImg: {
          type: String,
          trim: true,
        },
        sponsorName: {
          type: String,
        },
      },
    ],
    problem_statement_link: {
      type: String,
      trim: true,
    },
    // users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
    headKtjId: {
      type: String,
      required: false,
    },
    competitionUrl: {
        type:String
    },
    headObjectId: {
      ref: "User",
      type: Schema.Types.ObjectId,
      required: false,
    },
    registration: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Competition", competitionSchema);
