const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teamSchema = new Schema({
  ktjID: {
    type: String,
    required: true,
  },
  captain: {
    type: String,
    required: true,
  },
  members: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    required: true,
  },
  event: {
    type: String,
    required: true,
  },
  eventId: {
    type: String,
    required: true,
  },
  category:{
    type:String,
  }
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
