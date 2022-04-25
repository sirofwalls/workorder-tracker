import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

// Get tech form local storage
const tech = JSON.parse(localStorage.getItem('tech'))

const initialState = {
    tech: tech ? tech : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Register the user
export const register = createAsyncThunk('auth/register', async (tech, thunkAPI) => {
    try {
        // Uses functions from authService.js
        return await authService.register(tech)
    } catch (error) {
        // Sends error as message if there was a problem registering the user
        const message = (error.response && error.reponse.data && error.response.data.message) || error.messsage || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Login the user
export const login = createAsyncThunk('auth/login', async (tech, thunkAPI) => {
    try {
        // Uses functions from authService.js
        return await authService.login(tech)
    } catch (error) {
        // Sends error as message if there was a problem logging in
        const message = (error.response && error.reponse.data && error.response.data.message) || error.messsage || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Log out the tech
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})

// Slice to call the reset functionality when needed for the state
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Resets the states to default values
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tech = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.tech = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tech = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.tech = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.tech = null
            })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer