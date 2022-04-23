const express = require('express');
const router = express.Router();

const {
    registerTech,
    loginTech,
    getTech
} = require('../controllers/techController')

const {protect} = require('../middleware/authMiddleware')

router.post('/', registerTech)
router.post('/login', loginTech)
router.get('/me', protect, getTech)

module.exports = router;