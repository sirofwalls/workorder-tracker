import axios from 'axios'

const API_URL= '/api/v1/techs/'

// Register user in the Database
const register = async (techData) => {
    const response = await axios.post(API_URL, techData)

    if (response.data) {
        localStorage.setItem('tech', JSON.stringify(response.data))
    }

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

//Log out the user
const logout = () => {
    localStorage.removeItem('tech')
}

const authService = {
    register,
    logout,
    login
}

export default authService