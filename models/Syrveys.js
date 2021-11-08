const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({

      publisheId:Number,
      creted_at: {
        type: Date,
        required: true,
    default:Date.now()
    },      state:Boolean,
     titre:String,
     surveyLink:String,

});
module.exports = mongoose.model("Syrveys", userSchema);
