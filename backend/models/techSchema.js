const mongoose = require('mongoose')

const techSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please incluse a password"]
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Tech', techSchema)