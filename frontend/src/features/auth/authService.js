import axios from 'axios'

const API_URL= '/api/v1/techs/'

// Register user in the Database
const register = async (techData) => {
    const response = await axios.post(API_URL, techData)

    // Need to put somehting here eventually. originally was to provide token to registered user

    return response.data
}

// Login the user
const login = async (techData) => {
    const response = await axios.post(API_URL + 'login', techData)

    if (response.data) {
        localStorage.setItem('tech', JSON.stringify(response.data))
    }

    return response.data
}

// Get all of the users
const getUsers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + 'me', config)

    return response.data
}

//Log out the user
const logout = () => {
    localStorage.removeItem('tech')
}

const authService = {
    register,
    logout,
    login,
    getUsers
}

export default authService