import axios from 'axios'

const API_URL = '/api/v1/invoice/'

// Create new Invoice
const createInvoice = async (invoiceData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, invoiceData, config)

    return response.data
}

// Get all of the invoices
const getInvoices = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// Delete an Invoice
const deleteInvoice = async (invoiceId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + invoiceId, config)

    return response.data
}

const invoiceService = {
    createInvoice,
    getInvoices,
    deleteInvoice
}

export default invoiceService