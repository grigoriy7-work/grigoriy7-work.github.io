import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Profile, AuthState } from './types';

const profile: Profile = { email: 'admin@test.com', name: 'John', about: 'test', role: 'admin' };

export const fetchProfile = createAsyncThunk('profile/fetchProfile', async (): Promise<Profile> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(profile);
    }, 500);
  });
});

const initialState: AuthState = {
  token: localStorage.getItem('token') || '',
  isAuthenticated: localStorage.getItem('token') !== '',
  profile: localStorage.getItem('token') !== '' ? profile : null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
      state.isAuthenticated = true;
    },
    clearToken: (state) => {
      state.token = '';
      localStorage.removeItem('token');
      state.isAuthenticated = false;
    },
    clearProfile: (state) => {
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state, action) => {})
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        console.error(action.payload);
      });
  },
});

export const { setToken, clearToken, clearProfile } = authSlice.actions;

export default authSlice.reducer;
