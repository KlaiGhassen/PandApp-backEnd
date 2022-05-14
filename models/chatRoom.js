const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    userName: { type: String},
    email: { type: String},
    chatRoom: { type: String, unique: true },
});
module.exports = mongoose.model("chatRoom", userSchema);