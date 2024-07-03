const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const emailDataSchema = new Schema(
  {
    sender: {
      type: String,
      trim: true,
    },
    senderName:{
      type:String,
    },

    commonRecipients: [
      {
        type: String,
        trim: true
      }
    ],

    privateRecipient: {
      type: String,
      trim: true,
    
    },

    subject: {
      type: String,
      required: true
    },

    emailbody: {
      type:String ,
      required:true
     
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("emaildata", emailDataSchema);