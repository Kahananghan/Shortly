import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import loadingReducer from './slice/loadingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    loading: loadingReducer,
  },
});