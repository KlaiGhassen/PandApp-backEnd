const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
   classe:String ,
    picture: { type: String, default: "default.png" },
 
});
module.exports = mongoose.model("emploi", userSchema);