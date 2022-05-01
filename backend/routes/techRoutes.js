const express = require('express');
const router = express.Router();

// Constrollers to easily manage the logic of the request
const {
    registerTech,
    loginTech,
    getTech,
    editTech
} = require('../controllers/techController')

const {protect} = require('../middleware/authMiddleware')

// Example Route: domain.com/api/v1/techs
router.post('/', protect, registerTech)
router.post('/login', loginTech)
router.get('/me', protect, getTech)
router.put('/edit/:id', protect, editTech)

module.exports = router;