const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    userEmail: String,
    postId: String,
});
module.exports = mongoose.model("EventInt", userSchema);