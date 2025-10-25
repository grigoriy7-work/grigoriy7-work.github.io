// eslint-disable-next-line import/named
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Profile, AuthState, RegistationData } from './types';
import { fetchAuthData } from '../forms/AuthForm/registration';
import { AuthResult } from '../forms/AuthForm/types';

const profile: Profile = { email: 'admin@test.com', name: 'John', about: 'test', role: 'admin' };

export const fetchProfile = createAsyncThunk('profile/fetchProfile', async (): Promise<Profile> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(profile);
    }, 500);
  });
});

export const fetchRegistration = createAsyncThunk(
  'auth/fetchRegistration',
  async (args: { email: string; password: string }): Promise<AuthResult> => {
    return new Promise((resolve, reject) => {
      fetchAuthData(args.email, args.password)
        .then((authData) => {
          if (authData.authResult != null) {
            resolve({ token: authData.authResult.token });
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
);

const initialState: AuthState = {
  token: localStorage.getItem('token') || '',
  isAuthenticated: localStorage.getItem('token') !== '',
  profile: localStorage.getItem('token') !== '' ? profile : null,
  loading: false,
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
    registrationStart: (state, action: PayloadAction<RegistationData>) => {
      state.loading = true;
    },
    registrationSuccess: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
      state.isAuthenticated = true;
      state.loading = false;
    },
    registrationFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      console.error(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      //.addCase(fetchProfile.pending, (state, action) => {})
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        console.error(action.payload);
      })
      .addCase(fetchRegistration.fulfilled, (state, action: PayloadAction<AuthResult>) => {
        state.token = action.payload.token;
      })
      .addCase(fetchRegistration.rejected, (state, action) => {
        console.error(action.payload);
      });
  },
});

export const { setToken, clearToken, clearProfile, registrationStart, registrationSuccess, registrationFailure } =
  authSlice.actions;

export default authSlice.reducer;
