import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import invoiceReducer from '../features/invoices/invoiceSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    invoices: invoiceReducer
  },
});
