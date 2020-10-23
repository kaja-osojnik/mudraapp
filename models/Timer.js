const mongoose = require("mongoose");

const TimerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    timer: {
        type: String,
        required: true
    },
    countdown: {
        type: Boolean,
        required: true
    }
})

module.exports = Timer = mongoose.model('timer', TimerSchema);