const mongoose = require("mongoose");
const Schema =  mongoose.Schema
const clubChatSchema = new Schema({
    clubName: String,
    esmElclub: String,
    messageclubs: [{ type: Schema.Types.ObjectId, ref: 'Messageclub' }],
    
});
module.exports = mongoose.model("clubChat", clubChatSchema);