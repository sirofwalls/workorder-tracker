const mongoose = require('mongoose')

const techSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    techRole: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please incluse a password"],
        minLength: [8, 'Password must be between 8 and 24 characters in length'],
        maxLength: [24, 'Password must be between 8 and 24 characters in length']
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Tech', techSchema)