const asyncHandler = require('express-async-handler')
const connectDB = require('../config/db')
const nodemailer = require('nodemailer')


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

        const createdId = results[0].insertId

        const singleSearch = await connectDB.promise().query(`SELECT * FROM workorders WHERE id=?`, [createdId])

        const getSingle = singleSearch[0][0]

        if(!getSingle) {
            res.status(400)
            throw new Error('That workorder was not found')
        }

        // Sends the email after saving the new workorder to the database
        const transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            },
            tls: {
                rejectUnauthorized: true,
                minVersion: "TLSv1.2"
            }
        })

        // Actual mail being sent. Text option is required for compatability with non html clients
        await transport.sendMail({
            from: process.env.MAIL_FROM,
            to: process.env.MAIL_TO,
            subject: `A new Work Order was created by ${getSingle.techName}`,
            html: `
            <html>
                <body>
                    <div style="
                    border 1px solid black; 
                    font-family: sans-serif;
                    line-hieight: 2;">
                        <h2>Work Order Details:</h2>
                        <p>Work Order Number: ${getSingle.techId}</p>
                        <p>Tech Name: ${getSingle.techName}</p>
                        <p>Client: ${getSingle.clientName}</p>
                        <p>Client Number: ${getSingle.clientNumber}</p>
                        <p>Start Time: ${getSingle.startTime}</p>
                        <p>End Time: ${getSingle.endTime}</p>
                        <p>Miles Traveled: ${getSingle.milesTraveled}</p>
                        <p>Time Travsled: ${getSingle.timeTraveled}</p>
                        <p>Internal Change Notes: ${getSingle.changeNotes ? (`${getSingle.changeNotes}`) : ('N/A')}</p>
                        <p>Notes for work done on job: ${getSingle.jobNotes ? (`${getSingle.jobNotes}`) : ('N/A')}</p>
                        <p>Verified Network?: ${getSingle.verifyNetwork ? ('Yes') : ('No')}</p>
                        <p>Verified WiFi?: ${getSingle.verifyWifi ? ('Yes') : ('No')}</p>
                        <p>ISP Speed Up: ${getSingle.speedUp}</p>
                        <p>ISP Speed Down: ${getSingle.speedDown}</p>
                    </div>
                </body>
            </html>
            `,
            text: `
                Work Order Details: \n\n
                Work Order Number: ${getSingle.techId}\n
                Tech Name: ${getSingle.techName}\n
                Client: ${getSingle.clientName}\n
                Client Number: ${getSingle.clientNumber}\n
                Start Time: ${getSingle.startTime}\n
                End Time: ${getSingle.endTime}\n
                Miles Traveled: ${getSingle.milesTraveled}\n
                Time Travsled: ${getSingle.timeTraveled}\n
                Internal Change Notes: ${getSingle.changeNotes ? (`${getSingle.changeNotes}`) : ('N/A')}\n
                Notes for work done on job: ${getSingle.jobNotes ? (`${getSingle.jobNotes}`) : ('N/A')}\n
                Verified Network?: ${getSingle.verifyNetwork ? ('Yes') : ('No')}\n
                Verified WiFi?: ${getSingle.verifyWifi ? ('Yes') : ('No')}\n
                ISP Speed Up: ${getSingle.speedUp}\n
                ISP Speed Down: ${getSingle.speedDown}`
        })

        res.status(200).json(getSingle)
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

    const id = req.tech.id
    const role = req.tech.techRole

    if (role === 'admin') {
        const results = await connectDB.promise().query(`SELECT * FROM workorders`)

        const clients = results[0]
        res.status(200).json(clients)
    } else {
        const results = await connectDB.promise().query(`SELECT * FROM workorders WHERE techId=?`, [id])

        const clients = results[0]
        res.status(200).json(clients)
    }
})

// Decription: Gets a single workorder (organize and sort on frontend)
// Route: GET /api/v1/workorder/:id
// Access: Private to author and admin/manager
const singleWorkorder = asyncHandler(async (req, res) => {
    const id = req.params.id
    const tech = req.tech

    if(!getSingle) {
        res.status(400)
        throw new Error('That workorder was not found')
    }

    // Double check that there is a user
    if (!tech) {
        res.status(401)
        throw new Error('User not found')
    }

    const singleSearch = await connectDB.promise().query(`SELECT * FROM workorders WHERE id=?`, [id])

    const getSingle = singleSearch[0][0]
    
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
    // Throws an error if there is no "req.tech" ... this is why the const is after the check from req
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

    const deletedWorkorder = editSearch[0]

    if(!deletedWorkorder) {
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