const mongoose = require("mongoose");
const { Decimal } = require("mongoose/lib/schema/index");
const userSchema = new mongoose.Schema({
    publisheId: String,
    publishedAt: { type: Date, required: true, default: Date.now() },
    state: Boolean,
    type: String,
    place: String,
    banner: String,
    title: String,
    description: String,
    Time: {
        type: String,
        required: true,
    },
    price: Decimal,
    rate: Number,
});
module.exports = mongoose.model("eventsPost", userSchema);