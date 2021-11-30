const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    clubName: String,
    clubOwner: Number,
    clubLogo: String,
    verified: Boolean,
    password: String,
    login: String,
    description:String,
    social: {type: Boolean ,default : false} ,
});
module.exports = mongoose.model("club", userSchema);