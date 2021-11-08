const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({

      longatitude:Number,
      latatitude:Number,
      creted_at: {
        type: Date,
        required: true,
    default:Date.now()
    },     
      userId: {
        type: Number,
        require: true,
        unique: true,
      },


});
module.exports = mongoose.model("parking", userSchema);
