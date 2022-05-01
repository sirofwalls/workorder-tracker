const expressAsyncHandler = require('express-async-handler')
const asyncHandler = require('express-async-handler')
const connectDB = require('../config/db')

// Decription: Set/Create the Client
// Route: POST /api/v1/client/
// Access: Private to admin/manager
const registerClient = asyncHandler(async (req, res) => {
    if (!req.body.clientName && !req.body.clientNumber) {
        res.status(400)
        throw new Error('Client name and number are required')
    }
    
    const {clientName, clientNumber} = req.body
    try {
        const results = await connectDB.promise().query(`INSERT INTO clients (clientName, clientNumber) VALUES(?, ?)`, [clientName, clientNumber])

        res.status(201).send({clientName, clientNumber})
    } catch (error) {
        if (error.errno === 1062) {
            res.status(400)
            throw new Error('That Client Number already exists')
        }
        if (error) {
            res.status(400)
            throw new Error('Something went wrong')
        }
        console.log(error);
    }
})

// Decription: Gets all of the Clients
// Route: GET /api/v1/client/
// Access: Private to admin/manager
const getClient = asyncHandler(async (req, res) => {
    const results = await connectDB.promise().query(`SELECT * FROM clients`)

    const clients = results[0]
    res.status(200).json(clients)
})

// Decription: Deletes the Client
// Route: DELETE /api/v1/client/delete/:id
// Access: Private to admin/manager
const deleteClient = asyncHandler(async (req, res) => {
    if (req.tech.techRole !== 'admin') {
        res.status(400)
        throw new Error('You do not have the correct role to do this.')
    }

    const id = req.params.id

    const editSearch = await connectDB.promise().query(`SELECT * FROM clients WHERE id=?`, [id])

    const client = editSearch[0][0]

    if(!client) {
        res.status(400)
        throw new Error('That client was not found')
    }

    await connectDB.promise().query(`DELETE FROM clients WHERE id=?`, [id])
    res.status(200).json({id: req.params.id})
}) 

module.exports = {
    getClient,
    registerClient,
    deleteClient
}