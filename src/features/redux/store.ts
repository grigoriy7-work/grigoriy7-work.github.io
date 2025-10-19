import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import oprationReducer from './OperationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    opration: oprationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
