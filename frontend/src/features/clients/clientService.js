import axios from 'axios'

const API_URL = '/api/v1/client/'

// Create new Invoice
const createClient = async (clientData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, clientData, config)

    return response.data
}

// Get all of the clients
const getClients = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

const deleteClient = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + 'delete/' + id, config)

    return response.data
}


const clientService = {
    createClient,
    getClients,
    deleteClient
}

export default clientService