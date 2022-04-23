const express = require('express');
const router = express.Router();

const {
    registerTech,
    loginTech,
    getTech,
    editTech
} = require('../controllers/techController')

const {protect} = require('../middleware/authMiddleware')

router.post('/', registerTech)
router.post('/login', loginTech)
router.get('/me', protect, getTech)
router.put('/edit/:id', protect, editTech)

module.exports = router;