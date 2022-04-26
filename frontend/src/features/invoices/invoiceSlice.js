import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import invoiceService from './invoiceService'

const initialState = {
    invoices: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message:''
}

// Create new invoice
export const createInvoice = createAsyncThunk('invoices/create', async (invoiceData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.tech.token
        return await invoiceService.createInvoice(invoiceData, token)
    } catch (error) {
        // Sends error as message if there was a problem registering the user
        const message = (error.response && error.reponse.data && error.response.data.message) || error.messsage || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get the Invoices
export const getInvoices = createAsyncThunk('invoices/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.tech.token
        return await invoiceService.getInvoices(token)
    } catch (error) {
        // Sends error as message if there was a problem registering the user
        const message = (error.response && error.reponse.data && error.response.data.message) || error.messsage || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
}
)

export const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(createInvoice.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createInvoice.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.invoices.push(action.payload)
        })
        .addCase(createInvoice.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getInvoices.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getInvoices.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.invoices = action.payload
        })
        .addCase(getInvoices.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset} = invoiceSlice.actions
export default invoiceSlice.reducer