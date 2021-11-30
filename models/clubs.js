const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
      clubName:String,
      clubOwner:Number,
      clubLogo:String,
      verified:Boolean,
      passward:String,
      login:String
});
module.exports = mongoose.model("club", userSchema);
