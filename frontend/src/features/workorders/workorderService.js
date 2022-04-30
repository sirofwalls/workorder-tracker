import axios from 'axios'

const API_URL = '/api/v1/workorder/'

// Create new Workorder
const createWorkorder = async (workorderData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, workorderData, config)

    return response.data
}

// Get all of the workorders
const getWorkorders = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// Delete an Workorder
const deleteWorkorder = async (workorderId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + workorderId, config)

    return response.data
}

const workorderService = {
    createWorkorder,
    getWorkorders,
    deleteWorkorder
}

export default workorderService