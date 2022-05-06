const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    userName: { type: String},
    chatRoom: { type: String},
});
module.exports = mongoose.model("chatRoom", userSchema);