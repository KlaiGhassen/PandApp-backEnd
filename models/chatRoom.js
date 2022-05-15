const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    userName: { type: String},
    emailUser: { type: String},
    emailPost:{type: String},
    userNameReciver:{type: String},
    chatRoom: { type: String, unique: true },
    senderPic:{ type: String}
});
module.exports = mongoose.model("chatRoom", userSchema);