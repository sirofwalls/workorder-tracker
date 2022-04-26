const mongoose = require("mongoose")

// constants for repeated items
const reqString = {
    type: String,
    required: true
}

const reqBool = {
    type: Boolean,
    default: false
}

const scehmaNumber = {
    type: Number,
    default: 0
}

// format schema for purchased items
const purchaseSchema = mongoose.Schema({
    item: reqString,
    cost: scehmaNumber
})

// main schema for invoices
const InvoiceSchema = new mongoose.Schema({
    techId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Tech'
    },
    techName: reqString,

    clientNumber: {
        type: Number,
        default: 01
    },
    clientName: reqString,

    startTime: {
        type: String
    },

    endTime: {
        type: String
    },

    milesTraveled: scehmaNumber,

    timeTraveled: scehmaNumber,

    purchases: [purchaseSchema],

    changeNotes: {
        type: String
    },
    jobNotes: reqString,

    verifyNetwork: reqBool,

    verifyWifi: reqBool,

    speedUp: scehmaNumber,

    speedDown: scehmaNumber,

}, {timestamps: true});

module.exports = mongoose.model('Invoice', InvoiceSchema);