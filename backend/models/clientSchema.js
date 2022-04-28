const mongoose = require('mongoose')

const clientSchma = mongoose.Schema({
    clientName: {
        type: String,
        required: [true, "Please add a Client Name"]
    },
    clientNumber: {
        type: Number,
        unique: true,
        required: [true, "Please add a Client Number"]
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Client', clientSchma)