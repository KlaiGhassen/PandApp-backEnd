const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
      clubName:String,
      clubOwner:Number,
      clubLogo:String,
      verifed:Boolean,
      passward:String,
      login:String
});
module.exports = mongoose.model("club", userSchema);
