const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// const deliveredSchema = new Schema({ name: String, profession: String });
const workshopSchema = new Schema(
  {
    number: {
      type: Number,
      unique:true,
    },
    title: {
      type: String, // Assuming title is a string
      required: true,
    },
    imageUrl: {
      type: String, // Assuming imageUrl is a string
    },
    users: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    joiningLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Interactive", workshopSchema);
