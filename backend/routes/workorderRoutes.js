const express = require('express');
const router = express.Router();

// Constrollers to easily manage the logic of the request
const {
    getWorkorder,
    singleWorkorder,
    createWorkorder,
    editWorkorder,
    deleteWorkorder
} = require('../controllers/workorderController')

const {protect} = require('../middleware/authMiddleware')

// Example Route: domain.com/api/v1/workorder/
router.get('/', protect, getWorkorder)
router.get('/:id', protect, singleWorkorder)
router.post('/', protect, createWorkorder)
router.put('/:id', protect, editWorkorder)
router.delete('/:id', protect, deleteWorkorder)

module.exports = router;