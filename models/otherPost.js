const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
      publisheId:String,
      publishedAt: {
        type: Date,
        required: true,
    default:Date.now()
    },
      state:Boolean,
      title:String,
      type:String,
      description:String,
      place:String,
      Image:String


});
module.exports = mongoose.model("otherPost", userSchema);
