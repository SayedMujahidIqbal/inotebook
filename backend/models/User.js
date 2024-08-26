const mongoose = require('mongoose');


const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        tyep: String,
        required: true
    },
    date:{
        tyep: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("user", userSchema);