const mongoose = require('mongoose');


const notesSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        tyep: String,
        default: "General"
    },
    date:{
        tyep: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("notes", notesSchema);