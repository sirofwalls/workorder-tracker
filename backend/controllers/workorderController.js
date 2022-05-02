const asyncHandler = require('express-async-handler')
const connectDB = require('../config/db')


// Decription: Set/Create the Workorder
// Route: POST /api/v1/workorder
// Access: Private to author and admin/manager
const createWorkorder = asyncHandler(async (req, res) => {
    if (!req.body) {
        res.status(400)
        throw new Error('Please enter the required data')
    }

    const {
        clientName,
        clientNumber,
        startTime,
        endTime, 
        milesTraveled,
        timeTraveled,
        changeNotes,
        jobNotes,
        verifyNetwork,
        verifyWifi,
        speedUp,
        speedDown
    } = req.body

    const {
        id: techId,
        techName
    } = req.tech

    try {
        const results = await connectDB.promise().query(`INSERT INTO workorders (techId, techName, clientName, clientNumber, startTime, endTime, milesTraveled, timeTraveled, changeNotes, jobNotes, verifyNetwork, verifyWifi, speedUp, speedDown) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [techId,
            techName,
            clientName,
            clientNumber,
            startTime,
            endTime, 
            milesTraveled,
            timeTraveled,
            changeNotes,
            jobNotes,
            verifyNetwork,
            verifyWifi,
            speedUp,
            speedDown])

        res.status(201).send(results)
    } catch (error) {
        if (error.errno === 1062) {
            res.status(400)
            throw new Error('That workorder already exists')
        }
        console.log(error);
    }
})

// Decription: Gets all of the workorders for user (all if admin) (organize and sort on frontend)
// Route: GET /api/v1/workorder
// Access: Private to author or admin
const getWorkorder = asyncHandler(async (req, res) => {

    const results = await connectDB.promise().query(`SELECT * FROM workorders`)

    const clients = results[0]
    res.status(200).json(clients)
})

// Decription: Gets a single workorder (organize and sort on frontend)
// Route: GET /api/v1/workorder/:id
// Access: Private to author and admin/manager
const singleWorkorder = asyncHandler(async (req, res) => {
    const id = req.params.id
    const tech = req.tech

    const singleSearch = await connectDB.promise().query(`SELECT * FROM workorders WHERE id=?`, [id])

    const getSingle = singleSearch[0][0]

    if(!getSingle) {
        res.status(400)
        throw new Error('That workorder was not found')
    }

    // Double check that there is a user
    if (!tech) {
        res.status(401)
        throw new Error('User not found')
    }
    
    // Make sure the user is allowed to view the workorder
    if (getSingle.techId !== tech.id && tech.techRole !== 'admin') {
        res.status(401)
        throw new Error('You do not have permission to view this workorder.')
    }

    res.status(200).json(getSingle)
})

// Decription: Edits the Workorder
// Route: PUT /api/v1/workorder/:id
// Access: Private to author and admin/manager
const editWorkorder = asyncHandler(async (req, res) => {
    const id = req.params.id

    const editSearch = await connectDB.promise().query(`SELECT * FROM workorders WHERE id=?`, [id])

    const editWorkorder = editSearch[0][0]

    if(!editWorkorder) {
        res.status(400)
        throw new Error('That workorder was not found')
    }

    // Double check that there is a user
    if (!req.tech) {
        res.status(401)
        throw new Error('User not found')
    }

    const tech = req.tech

    // Make sure the user is allowed to edit the workorder
    if ((editWorkorder.techId !== tech.id) && (tech.techRole !== 'admin')) {
        res.status(401)
        throw new Error('You do not have permission to view this workorder.')
    }

    const {
        clientName,
        clientNumber,
        startTime,
        endTime, 
        milesTraveled,
        timeTraveled,
        changeNotes,
        jobNotes,
        verifyNetwork,
        verifyWifi,
        speedUp,
        speedDown
    } = req.body

    const {
        id: techId,
        techName
    } = req.tech

    const updateClientName = clientName || editTech.techclientNameName
    const updateClientNumber = clientNumber || editTech.clientNumber
    const updateStartTime = startTime || editTech.startTime
    const updateEndTime = endTime || editTech.endTime
    const updateMilesTraveled = milesTraveled || editTech.milesTraveled
    const updateTimeTraveled = timeTraveled || editTech.timeTraveled
    const updateChangeNotes = changeNotes || editTech.changeNotes
    const updateLogNotes = jobNotes || editTech.jobNotes
    const updateVerifyNetwork = verifyNetwork || editTech.verifyNetwork
    const updateVerifyWifi = verifyWifi || editTech.verifyWifi
    const updateSpeedUp = speedUp || editTech.speedUp
    const updateSpeedDown = speedDown || editTech.speedDown

    const updatedWorkorder = await connectDB.promise().query(`UPDATE workorders SET techName = ?, techId = ?, clientName = ?, clientNumber = ?, startTime = ?, endTime = ?, milesTraveled = ?, timeTraveled = ?, changeNotes = ?, jobNotes = ?, verifyNetwork = ?, verifyWifi = ?, speedUp = ?, speedDown = ? WHERE id = ?`, 
            [techName,
            techId,
            updateClientName,
            updateClientNumber,
            updateStartTime,
            updateEndTime, 
            updateMilesTraveled,
            updateTimeTraveled,
            updateChangeNotes,
            updateLogNotes,
            updateVerifyNetwork,
            updateVerifyWifi,
            updateSpeedUp,
            updateSpeedDown,
            id
            ])

    res.status(200).json(updatedWorkorder)
})

// Decription: Deletes the workorder
// Route: DELETE /api/v1/workorder/:id
// Access: Private to admin/manager
const deleteWorkorder = asyncHandler(async (req, res) => {
    // Need to limit this to admin users only

    if (req.tech.techRole !== 'admin') {
        res.status(400)
        throw new Error('You do not have the correct role to do this.')
    }

    const id = req.params.id

    const editSearch = await connectDB.promise().query(`SELECT * FROM workorders WHERE id=?`, [id])

    const client = editSearch[0]

    if(!client) {
        res.status(400)
        throw new Error('That workorder was not found')
    }

    await connectDB.promise().query(`DELETE FROM workorders WHERE id=?`, [id])
    res.status(200).json({id: id})
}) 

module.exports = {
    getWorkorder,
    singleWorkorder,
    createWorkorder,
    editWorkorder,
    deleteWorkorder
}