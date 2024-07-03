const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// const Issue = new Schema({
//   type: Schema.Types.ObjectId,
//   ref: 'Issue',
// });
const verifyuserSchema = new Schema(
  {
   
    email: {
      type: String,
      // required: true,
      unique: true,
      trim: true,
    },
    useremailverified: {
      type: Boolean,
      default: false,
    },
    
  },
  {
    timestamps: true,
  }
);

const VerifyUser = mongoose.model("VerifyUser", verifyuserSchema);

module.exports = VerifyUser;
