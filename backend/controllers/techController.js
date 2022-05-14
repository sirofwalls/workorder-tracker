const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const connectDB = require('../config/db')

// Decription: Set/Create a new tech
// Route: POST /api/v1/techs
// Access: Public
const registerTech = asyncHandler( async (req, res) => {
    const {techName, email, password} = req.body
    
    // Make sure all the information was sent in the body
    if (!techName || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Make sure the email is lower case
    const lowerEmail = email.toLowerCase()

    // Check to see if the Tech already exists
    const techExists = await connectDB.promise().query(`SELECT * FROM users WHERE email=?`, [lowerEmail])

    if (techExists[0].length > 0) {
        res.status(400)
        throw new Error('Tech Already exists')
    }

    // Hash the password
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create the Tech
    await connectDB.promise().query(`INSERT INTO users (techName, email, password) VALUES(?, ?, ?)`, [techName, lowerEmail, hashedPassword])

    const results = await connectDB.promise().query(`SELECT * FROM users WHERE email=?`, [lowerEmail])

    const tech = results[0][0]

    if (tech) {
        res.status(201).json({
            message: 'Tech has been created'
        })
    } else {
        if (error.errno === 1062) {
            res.status(400)
            throw new Error('That Client Number already exists')
        }
        res.status(400)
        console.log(error);
        throw new Error('Invalid data or somehting went wrong')
    }
})

// Decription: Authenticate a registered tech
// Route: POST /api/v1/techs/login
// Access: Public
const loginTech = asyncHandler( async (req, res) => {
    const {email, password} = req.body
    const lowerEmail = email.toLowerCase()

    // Check for user email
    const results = await connectDB.promise().query(`SELECT * FROM users WHERE email=?`, [lowerEmail])
    
    const tech = results[0][0]

    if (tech && (await bcrypt.compare(password, tech.password))) {
        res.json({
            id: tech.id,
            name: tech.techName,
            email: tech.email,
            role: tech.techRole,
            token: generateToken(tech.id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }

})

// Decription: Get all techs data
// Route: POST /api/v1/techs/me
// Access: Private
const getTech = asyncHandler( async (req, res) => {
    // If admin, then get all the techs information
    if (req.tech.techRole === 'admin') {
        const results = await connectDB.promise().query(`SELECT id, techName, email, techRole FROM users`)

        const tech = results[0]
        
        res.status(200).json(tech)
    } else{
        id = req.tech.id
        const results = await connectDB.promise().query(`SELECT id, techName, email, techRole FROM users WHERE id=?`, [id])

        const tech = results[0]
        
        res.status(200).json(tech)
    }
})

// Decription: Edit the tech
// Route: PUT /api/v1/techs/edit/:id
// Access: Private to admin only
const editTech = asyncHandler(async (req, res) => {
    
    const id = req.params.id

    const editSearch = await connectDB.promise().query(`SELECT * FROM users WHERE id=?`, [id])

    const editTech = editSearch[0][0]

    if(!editTech) {
        res.status(400)
        throw new Error('That tech was not found')
    }
    
    // Confirm that the tech making the change has admin role
    const selfTech = req.tech

    // Double check that there is a user
    if (!selfTech) {
        res.status(401)
        throw new Error('Tech not found')
    }

    // Make sure the user is allowed to edit the tech
    if ((selfTech.techRole.toString() !== 'admin') && (selfTech.id !== editTech.id)) {
        res.status(401)
        throw new Error('You do not have permission to make this change.')
    }

    // Only an Admin should be able to change the tech roles
    if (req.body.techRole && selfTech.techRole.toString() !== 'admin') {
        res.status(401)
        throw new Error('You do not have permission to make this change.')
    }

    if (req.body.password && (selfTech.id === editTech.id)) {
        const {password} = req.body
        const salt = await bcrypt.genSalt(12)

        const updatePassword = await bcrypt.hash(password, salt)
        const updateName = req.body.name || editTech.techName
        const updateEmail = req.body.email.toLowerCase() || editTech.email
        const updateTechRole = req.body.techRole || editTech.techRole

        await connectDB.promise().query(`UPDATE users SET techName = ? , email = ?, techRole = ?, password=? WHERE users.id = ?`, [updateName, updateEmail, updateTechRole, updatePassword, id])
    } else{
        const updateName = req.body.name || editTech.techName
        const updateEmail = req.body.email.toLowerCase() || editTech.email
        const updateTechRole = req.body.techRole || editTech.techRole


        await connectDB.promise().query(`UPDATE users SET techName = ? , email = ?, techRole = ? WHERE users.id = ?`, [updateName, updateEmail, updateTechRole, id])
    }

    const dbSearch = await connectDB.promise().query(`SELECT * FROM users WHERE id=?`, [id])
    
    const results = dbSearch[0][0]
    const {id: _id, techName, email, techRole} = results

    // This is the payload returned to the slice.
    if (selfTech.id === editTech.id) {
        res.status(200).json({
            id,
            name: techName,
            role: techRole,
            email,
            token: generateToken(id)
        })
    } else {
        // Need to set the selfTech options in case an admin edits a user so it can keep the same state
        res.status(200).json({
            id: selfTech.id,
            name: selfTech.techName,
            role: selfTech.techRole,
            email: selfTech.email,
            token: req.headers.authorization.split(' ')[1]
        })
    }
    
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerTech,
    loginTech,
    getTech,
    editTech
}