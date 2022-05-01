import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import clientService from './clientService'

const initialState = {
    clients: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create new Client
export const createClient = createAsyncThunk('clients/create', async (clientData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.tech.token
        return await clientService.createClient(clientData, token)
    } catch (error) {
        // Sends error as message if there was a problem registering the client
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get the Clients
export const getClients = createAsyncThunk('clients/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.tech.token
        return await clientService.getClients(token)
    } catch (error) {
        // Sends error as message if there was a problem registering the user
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete the Clients
export const deleteClient = createAsyncThunk('clients/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.tech.token
        return await clientService.deleteClient(id, token)
    } catch (error) {
        // Sends error as message if there was a problem registering the user
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


// Slice to call the reset functionality when needed for the state
export const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        // Resets the states to default values
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(createClient.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createClient.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.clients.push(action.payload)
        })
        .addCase(createClient.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getClients.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getClients.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.clients = action.payload
        })
        .addCase(getClients.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteClient.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteClient.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.clients = state.clients.filter((clients) => clients.id.toString() !== action.payload.id)
        })
        .addCase(deleteClient.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset} = clientSlice.actions
export default clientSlice.reducer