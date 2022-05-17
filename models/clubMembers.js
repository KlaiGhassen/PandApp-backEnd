const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    clubName: String,
    userEmail: String,
    userName: String,
    memberPicture: String,
    state: Boolean,
    name: String,
});
module.exports = mongoose.model("clubMembers", userSchema);