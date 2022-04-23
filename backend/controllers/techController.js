const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Tech = require('../models/techSchema')

// Decription: Set/Create a new tech
// Route: POST /api/v1/techs
// Access: Public
const registerTech = asyncHandler( async (req, res) => {
    const {name, email, password} = req.body
    
    // Make sure all the information was sent in the body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check to see if the Tech already exists
    const techExists = await Tech.findOne({email})

    if (techExists) {
        res.status(400)
        throw new Error('Tech Already exists')
    }

    // Hash the password
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create the Tech
    const tech = await Tech.create({
        name, 
        email, 
        password: hashedPassword
    })
    console.log(tech)

    if (tech) {
        res.status(201).json({
            _id: tech.id,
            name: tech.name,
            email: tech.email,
            token: generateToken(tech._id)

        })
    } else {
        res.status(400)
        throw new Error('Invalid data')
    }
})

// Decription: Authenticate a registered tech
// Route: POST /api/v1/techs/login
// Access: Public
const loginTech = asyncHandler( async (req, res) => {
    const {email, password} = req.body

    // Check for user email
    const tech = await Tech.findOne({email})

    if (tech && (await bcrypt.compare(password, tech.password))) {
        res.json({
            _id: tech.id,
            name: tech.name,
            email: tech.email,
            token: generateToken(tech._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }

})

// Decription: Get tech data
// Route: POST /api/v1/techs/me
// Access: Private
const getTech = asyncHandler( async (req, res) => {
    const {_id, name, email} = await Tech.findById(req.tech.id)

    res.status(200).json({
        id: _id,
        name,
        email
    })
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

module.exports = {
    registerTech,
    loginTech,
    getTech
}