import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import workorderReducer from '../features/workorders/workorderSlice';
import clientReducer from '../features/clients/clientSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    workorders: workorderReducer,
    clients: clientReducer
  },
});
