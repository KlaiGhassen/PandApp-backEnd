const mongoose = require("mongoose");
const Schema = mongoose.Schema
const MessageclubSchema = new Schema({
    textMessage: String,
    userId: String,
    time: Date,
    clubChat: { type: Schema.Types.ObjectId, ref: 'clubChat' },
    userImage: String,
    
    
});
module.exports = mongoose.model("Messageclub", MessageclubSchema);