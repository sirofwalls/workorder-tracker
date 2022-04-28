const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Tech = require('../models/techSchema')
const mongoose = require('mongoose')

// Decription: Set/Create a new tech
// Route: POST /api/v1/techs
// Access: Public
const registerTech = asyncHandler( async (req, res) => {
    const {name, email, password, techRole} = req.body
    
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

    if (tech) {
        res.status(201).json({
            _id: tech.id,
            name: tech.name,
            email: tech.email,
            role: tech.techRole,
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
            role: tech.techRole,
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

    res.status(200).json(req.tech)
})

// Decription: Edit the tech
// Route: PUT /api/v1/techs/edit/:id
// Access: Private to admin only
const editTech = asyncHandler(async (req, res) => {
    // Find the tech to be changed

    const validID = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!validID) {
        res.status(400)
        throw new Error('That is not a valid ID')
    }

    const editTech = await Tech.findById(req.params.id)

    if(!editTech) {
        res.status(400)
        throw new Error('That tech was not found')
    }

    // Confirm that the tech making the change has admin role
    const adminTech = await Tech.findById(req.tech.id)

    // Double check that there is a user
    if (!adminTech) {
        res.status(401)
        throw new Error('Tech not found')
    }

    // Make sure the user is allowed to edit the invoice
    if (adminTech.techRole.toString() !== 'admin') {
        res.status(401)
        throw new Error('You do not have permission to make this change.')
    }

    const updatedTech = await Tech.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedTech)
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