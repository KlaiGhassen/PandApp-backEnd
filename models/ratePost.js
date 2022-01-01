const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    postId: String,
    userEmail: String,
    note: Number,
});
module.exports = mongoose.model("rate", userSchema);