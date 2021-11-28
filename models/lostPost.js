const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    publisheId: String,
    publishedAt: { type: Date, required: true, default: Date.now() },
    state: Boolean,
    type: String,
    object: String,
    place: String,
    image: String,
});
module.exports = mongoose.model("lostPost", userSchema);