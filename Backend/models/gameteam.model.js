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

  gameId: {
    type: String,
    required: true,
  },
  ign: {
    type: [{ type: String }],
  },
  game_type: {
    type: String,
  },
  in_game_id: {
    type: [{ type: String }],
  },
  teamName: {
    type: String,
  },
});

const Gameteam = mongoose.model("Gameteam", teamSchema);

module.exports = Gameteam;
