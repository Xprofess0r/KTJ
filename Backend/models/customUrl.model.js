const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UrlSchema = new Schema(
  {
     actualUrl :{
         type: String,
         required: true,
     },
     customUrl :{
            type: String,
     }
  },
  { timestamps: true }
);

module.exports = mongoose.model("customUrl", UrlSchema);
