const mongoose = require("mongoose");
const { Decimal } = require("mongoose/lib/schema/index");
const userSchema = new mongoose.Schema({
    publisheId: String,
    publishedAt: { type: Date, required: true, default: Date.now() },
    className: String,
    module: String,
    coursName: String,
    courseFile: String,
});
module.exports = mongoose.model("Elearning", userSchema);