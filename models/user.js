const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  identifant: { type: String, required: true },
  email: String,
  password: String,
  phoneNumber: Number,
  profilePicture: String,
  FirstName: String,
  LastName: String,
  social: Boolean,
  role: String,
  verified: { type: Boolean, default: false },
  className: String,
});
module.exports = mongoose.model("user", userSchema);
