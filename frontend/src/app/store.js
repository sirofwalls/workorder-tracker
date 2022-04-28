import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import invoiceReducer from '../features/invoices/invoiceSlice';
import clientReducer from '../features/clients/clientSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    invoices: invoiceReducer,
    clients: clientReducer
  },
});
