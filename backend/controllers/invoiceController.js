const asyncHandler = require('express-async-handler')
const Invoice = require('../models/invoiceSchema')
const mongoose = require('mongoose')


// Decription: Set/Create the Invoice
// Route: POST /api/v1/invoice
// Access: Private to author and admin/manager
const createInvoice = asyncHandler(async (req, res) => {
    if (!req.body) {
        res.status(400)
        throw new Error('Please enter the required data')
    }

    const invoice = await Invoice.create({
        ...req.body,
        techId: req.tech.id,
        techName: req.tech.name,
    })
    res.status(200).json(invoice)
})

// Decription: Gets all of the invoices for user (all if admin) (organize and sort on frontend)
// Route: GET /api/v1/invoice
// Access: Private to author or admin
const getInvoice = asyncHandler(async (req, res) => {

    if (req.tech.techRole === 'admin') {
        const invoice = await Invoice.find()
        res.status(200).json(invoice)
    } else {
        const invoice = await Invoice.find({techId: req.tech.id})
        res.status(200).json(invoice)
    }
})

// Decription: Gets a single invoice (organize and sort on frontend)
// Route: GET /api/v1/invoice/:id
// Access: Private to author and admin/manager
const singleInvoice = asyncHandler(async (req, res) => {
    const validID = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!validID) {
        res.status(400)
        throw new Error('That is not a valid ID')
    }

    const getSingle = await Invoice.findById(req.params.id)

    if(!getSingle) {
        res.status(400)
        throw new Error('That invoice was not found')
    }

    const tech = await Tech.findById(req.tech.id)

    // Double check that there is a user
    if (!tech) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the user is allowed to view the invoice
    if (getSingle.techId.toString() !== tech.id && tech.techRole !== 'admin') {
        res.status(401)
        throw new Error('You do not have permission to view this invoice.')
    }

    res.status(200).json(getSingle)
})

// Decription: Edits the Invoice
// Route: PUT /api/v1/invoice/:id
// Access: Private to author and admin/manager
const editInvoice = asyncHandler(async (req, res) => {
    const validID = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!validID) {
        res.status(400)
        throw new Error('That is not a valid ID')
    }

    const invoice = await Invoice.findById(req.params.id)

    if(!invoice) {
        res.status(400)
        throw new Error('That invoice was not found')
    }

    // Double check that there is a user
    if (!req.tech) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the user is allowed to edit the invoice
    if ((invoice.techId.toString() !== tech.id) && (tech.techRole !== 'admin')) {
        res.status(401)
        throw new Error('You do not have permission to view this invoice.')
    }

    const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedInvoice)
})

// Decription: Deletes the Invoice
// Route: DELETE /api/v1/invoice/:id
// Access: Private to admin/manager
const deleteInvoice = asyncHandler(async (req, res) => {
    // Need to limit this to admin users only

    const validID = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!validID) {
        res.status(400)
        throw new Error('That is not a valid ID')
    }

    const invoice = await Invoice.findById(req.params.id)

    if(!invoice) {
        res.status(400)
        throw new Error('That invoice was not found')
    }

    // Double check that there is a user
    if (!req.tech) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the user is allowed to edit the invoice
    if ((invoice.techId.toString() !== req.tech.id) && (req.tech.techRole !== 'admin')) {
        res.status(401)
        throw new Error('You can not delete an invoice that does not belong to you.')
    }

    await Invoice.findByIdAndDelete(req.params.id)
    res.status(200).json({id: req.params.id})
}) 

module.exports = {
    getInvoice,
    singleInvoice,
    createInvoice,
    editInvoice,
    deleteInvoice
}