import { createSlice } from '@reduxjs/toolkit';
import { OperationState } from './types';

const initialState: OperationState = {
  operations: [],
};

export const operationSlice = createSlice({
  name: 'operation',
  initialState,
  reducers: {
    setOperation: (state, action) => {
      state.operations.push(action.payload);
    },
  },
});

export const { setOperation } = operationSlice.actions;
export default operationSlice.reducer;
