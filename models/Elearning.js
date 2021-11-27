const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    publisheId: String,
    publishedAt: { type: Date, default: Date.now() },
    className: String,
    module: String,
    courseName: String,
    courseFile: String,
});
module.exports = mongoose.model("Elearning", userSchema);