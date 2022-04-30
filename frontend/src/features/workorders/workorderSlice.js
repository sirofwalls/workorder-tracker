import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import workorderService from './workorderService'

const initialState = {
    workorders: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create new workorder
export const createWorkorder = createAsyncThunk('workorders/create', async (workorderData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.tech.token
        return await workorderService.createWorkorder(workorderData, token)
    } catch (error) {
        // Sends error as message if there was a problem registering the user
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get the Workorders
export const getWorkorders = createAsyncThunk('workorders/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.tech.token
        return await workorderService.getWorkorders(token)
    } catch (error) {
        // Sends error as message if there was a problem registering the user
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete a single workorder
export const deleteWorkorder = createAsyncThunk('workorders/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.tech.token
        return await workorderService.deleteWorkorder(id, token)
    } catch (error) {
        // Sends error as message if there was a problem registering the user
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const workorderSlice = createSlice({
    name: 'workorder',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(createWorkorder.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createWorkorder.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.workorders.push(action.payload)
        })
        .addCase(createWorkorder.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getWorkorders.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getWorkorders.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.workorders = action.payload
        })
        .addCase(getWorkorders.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteWorkorder.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteWorkorder.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.workorders = state.workorders.filter((workorder) => workorder._id !== action.payload.id)
        })
        .addCase(deleteWorkorder.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset} = workorderSlice.actions
export default workorderSlice.reducer