const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
    },
    creted_at: {
        type: Date,
        required: true,
    default:Date.now()
    },
    
    messageContent: {
        type: String,
    },
    roomName: {
        type: String,
        unique: true
    },
   
    viewType: {
        type: Number,
    },





},

)
module.exports = mongoose.model('message', userSchema)