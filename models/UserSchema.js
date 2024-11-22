const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
      type: String,
      required: true,
      unique: true,  
      index: true     
    },
    Amount: {
      type: Number,
      default: 0
    },
    captcha: {
      type: String,
    },
    password: { type: String, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  });
  
module.exports = mongoose.model("Userofassignment", userSchema)
