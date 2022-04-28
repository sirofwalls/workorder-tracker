const asyncHandler = require('express-async-handler')
const Client = require('../models/clientSchema')
const mongoose = require('mongoose')


// Decription: Gets all of the Clients
// Route: GET /api/v1/client/
// Access: Private to admin/manager
const getClient = asyncHandler(async (req, res) => {
    const clients = await Client.find()

    res.status(200).json(clients)
})

// Decription: Set/Create the Client
// Route: POST /api/v1/client/
// Access: Private to admin/manager
const registerClient = asyncHandler(async (req, res) => {
    if (!req.body.clientName && !req.body.clientNumber) {
        res.status(400)
        throw new Error('Client name and number are required')
    }
    
    const client = await Client.create({
        clientName: req.body.clientName,
        clientNumber: req.body.clientNumber
    })
    
    if (client) {
        res.status(201).json({
            _id: client.id,
            name: client.clientName,
            number: client.clientNumber
        })
    } else {
        res.status(400)
        throw new Error('Invalid data')
    }
})

// Decription: Deletes the Client
// Route: DELETE /api/v1/client/delete/:id
// Access: Private to admin/manager
const deleteClient = asyncHandler(async (req, res) => {
    if (req.tech.techRole !== 'admin') {
        res.status(400)
        throw new Error('You do not have the correct role to do this.')
    }

    const validID = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!validID) {
        res.status(400)
        throw new Error('That is not a valid ID')
    }

    const client = await Client.findById(req.params.id)

    if(!client) {
        res.status(400)
        throw new Error('That client was not found')
    }

    await Client.findByIdAndDelete(req.params.id)
    res.status(200).json({id: req.params.id})
}) 

module.exports = {
    getClient,
    registerClient,
    deleteClient
}