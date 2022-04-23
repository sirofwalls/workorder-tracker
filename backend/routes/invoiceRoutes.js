const express = require('express');
const router = express.Router();

// Constrollers to easily manage the logic of the request
const {
    getInvoice,
    singleInvoice,
    createInvoice,
    editInvoice,
    deleteInvoice
} = require('../controllers/invoiceController')

const {protect} = require('../middleware/authMiddleware')

// Example Route: domain.com/api/v1/invoice/
router.get('/', protect, getInvoice)
router.get('/:id', protect, singleInvoice)
router.post('/', protect, createInvoice)
router.put('/:id', protect, editInvoice)
router.delete('/:id', protect, deleteInvoice)

module.exports = router;