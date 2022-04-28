const express = require('express');
const router = express.Router();

// Constrollers to easily manage the logic of the request
const {
    registerClient,
    getClient,
    deleteClient
} = require('../controllers/clientController')

const {protect} = require('../middleware/authMiddleware')

// Example Route: domain.com/api/v1/client
router.get('/', protect, getClient)
router.post('/add', protect, registerClient)
router.delete('/delete/:id', protect, deleteClient)

module.exports = router;