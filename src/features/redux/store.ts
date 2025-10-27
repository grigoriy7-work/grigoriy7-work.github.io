import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import oprationReducer from './OperationSlice';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './rootSaga';
import { authApi } from './authQuery';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    opration: oprationReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(authApi.middleware).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
