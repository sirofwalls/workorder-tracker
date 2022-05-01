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

    // Check to see if the Tech already exists
    const techExists = await connectDB.promise().query(`SELECT * FROM users WHERE email=?`, email)

    if (techExists[0].length > 0) {
        res.status(400)
        throw new Error('Tech Already exists')
    }

    // Hash the password
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create the Tech
    await connectDB.promise().query(`INSERT INTO users (techName, email, password) VALUES(?, ?, ?)`, [techName, email, hashedPassword])

    const results = await connectDB.promise().query(`SELECT * FROM users WHERE email=?`, [email])

    const tech = results[0][0]

    if (tech) {
        res.status(201).json({
            id: tech.id,
            name: tech.techName,
            email: tech.email,
            role: tech.techRole,
            token: generateToken(tech.id)
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

    // Check for user email
    const results = await connectDB.promise().query(`SELECT * FROM users WHERE email=?`, [email])
    
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

// Decription: Get tech data for logged in user
// Route: POST /api/v1/techs/me
// Access: Private
const getTech = asyncHandler( async (req, res) => {
    const {id, techName, email, techRole} = req.tech

    res.status(200).json({id, techName, email, techRole})
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
    const adminTech = req.tech

    // Double check that there is a user
    if (!adminTech) {
        res.status(401)
        throw new Error('Tech not found')
    }


    // Make sure the user is allowed to edit the workorder
    if (adminTech.techRole.toString() !== 'admin') {
        res.status(401)
        throw new Error('You do not have permission to make this change.')
    }

    const updateName = req.body.techName || editTech.techName
    const updateEmail = req.body.email || editTech.email
    const updateTechRole = req.body.techRole || editTech.techRole

    const updatedTech = await connectDB.promise().query(`UPDATE users SET techName = ? , email = ?, techRole = ? WHERE users.id = ?`, [updateName, updateEmail, updateTechRole, id])

    const dbSearch = await connectDB.promise().query(`SELECT * FROM users WHERE id=?`, [id])
    
    const results = dbSearch[0][0]
    const {id: _id, techName, email, techRole} = results

    res.status(200).json({id, techName, email, techRole})
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