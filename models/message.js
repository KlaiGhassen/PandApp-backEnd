const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    creted_at: {
        type: Date,
        required: true,
    default:Date.now()
    },
    
    whoSend: {
        type: String,
    },
    toSend: {
        type: String,
    },





},

)
module.exports = mongoose.model('message', userSchema)