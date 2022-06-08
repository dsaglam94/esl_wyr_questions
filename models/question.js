const mongoose = require('mongoose')
const { Schema } = mongoose

const questionSchema = new Schema({
    question: {
        type: String,
        required: true,
        minLength: 10
    },
    vote: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('WYR_Question', questionSchema);