const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    clubName: String,
    userEmail: String,
    userName: String,
    memberPicture: String,
    state: Boolean,
});
module.exports = mongoose.model("clubMembers", userSchema);