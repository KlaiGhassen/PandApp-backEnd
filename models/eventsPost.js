const mongoose = require("mongoose");
const { Decimal } = require("mongoose/lib/schema/index");
const userSchema = new mongoose.Schema({
 
      publisheId:Number,
      publishedAt:
      {type: Date,
      required: true,
  default:Date.now()},
      state:Boolean,
      type:String,
      place:String,
      banner:String,
      Time: {
        type: Date,
        required: true,
    },
      price:Decimal,
      rate:Number,


});
module.exports = mongoose.model("eventsPost", userSchema);
