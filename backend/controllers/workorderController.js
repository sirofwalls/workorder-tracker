const asyncHandler = require('express-async-handler')
const Workorder = require('../models/workorderSchema')
const mongoose = require('mongoose')


// Decription: Set/Create the Workorder
// Route: POST /api/v1/workorder
// Access: Private to author and admin/manager
const createWorkorder = asyncHandler(async (req, res) => {
    if (!req.body) {
        res.status(400)
        throw new Error('Please enter the required data')
    }

    const workorder = await Workorder.create({
        ...req.body,
        techId: req.tech.id,
        techName: req.tech.name,
    })
    res.status(200).json(workorder)
})

// Decription: Gets all of the workorders for user (all if admin) (organize and sort on frontend)
// Route: GET /api/v1/workorder
// Access: Private to author or admin
const getWorkorder = asyncHandler(async (req, res) => {

    if (req.tech.techRole === 'admin') {
        const workorder = await Workorder.find()
        res.status(200).json(workorder)
    } else {
        const workorder = await Workorder.find({techId: req.tech.id})
        res.status(200).json(workorder)
    }
})

// Decription: Gets a single workorder (organize and sort on frontend)
// Route: GET /api/v1/workorder/:id
// Access: Private to author and admin/manager
const singleWorkorder = asyncHandler(async (req, res) => {
    const validID = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!validID) {
        res.status(400)
        throw new Error('That is not a valid ID')
    }

    const getSingle = await Workorder.findById(req.params.id)

    if(!getSingle) {
        res.status(400)
        throw new Error('That workorder was not found')
    }

    const tech = await Tech.findById(req.tech.id)

    // Double check that there is a user
    if (!tech) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the user is allowed to view the workorder
    if (getSingle.techId.toString() !== tech.id && tech.techRole !== 'admin') {
        res.status(401)
        throw new Error('You do not have permission to view this workorder.')
    }

    res.status(200).json(getSingle)
})

// Decription: Edits the Workorder
// Route: PUT /api/v1/workorder/:id
// Access: Private to author and admin/manager
const editWorkorder = asyncHandler(async (req, res) => {
    const validID = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!validID) {
        res.status(400)
        throw new Error('That is not a valid ID')
    }

    const workorder = await Workorder.findById(req.params.id)

    if(!workorder) {
        res.status(400)
        throw new Error('That workorder was not found')
    }

    // Double check that there is a user
    if (!req.tech) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the user is allowed to edit the workorder
    if ((workorder.techId.toString() !== tech.id) && (tech.techRole !== 'admin')) {
        res.status(401)
        throw new Error('You do not have permission to view this workorder.')
    }

    const updatedWorkorder = await Workorder.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedWorkorder)
})

// Decription: Deletes the workorder
// Route: DELETE /api/v1/workorder/:id
// Access: Private to admin/manager
const deleteWorkorder = asyncHandler(async (req, res) => {
    // Need to limit this to admin users only

    const validID = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!validID) {
        res.status(400)
        throw new Error('That is not a valid ID')
    }

    const workorder = await WOrkorder.findById(req.params.id)

    if(!workorder) {
        res.status(400)
        throw new Error('That workorder was not found')
    }

    // Double check that there is a user
    if (!req.tech) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the user is allowed to edit the workorder
    if ((workorder.techId.toString() !== req.tech.id) && (req.tech.techRole !== 'admin')) {
        res.status(401)
        throw new Error('You can not delete an workorder that does not belong to you.')
    }

    await Workorder.findByIdAndDelete(req.params.id)
    res.status(200).json({id: req.params.id})
}) 

module.exports = {
    getWorkorder,
    singleWorkorder,
    createWorkorder,
    editWorkorder,
    deleteWorkorder
}