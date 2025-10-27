// eslint-disable-next-line import/named
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Profile, AuthState, RegistationData } from './types';
import { fetchAuthData } from '../forms/AuthForm/registration';
import { AuthResult, ResultFetchAuth, ServerErrors } from '../forms/AuthForm/types';

const profile: Profile = { email: 'admin@test.com', name: 'John', about: 'test', role: 'admin' };

export const fetchProfile = createAsyncThunk('profile/fetchProfile', async (): Promise<Profile> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(profile);
    }, 500);
  });
});

export const fetchRegistration = createAsyncThunk<
  AuthResult,
  { email: string; password: string },
  { rejectValue: ServerErrors | null }
>('auth/fetchRegistration', async (args, { rejectWithValue }) => {
  try {
    const authData = await fetchAuthData(args.email, args.password);
    if (authData.authResult != null) {
      return { token: authData.authResult.token };
    } else if (authData.serverErrors != null) {
      return rejectWithValue(authData.serverErrors);
    }
  } catch (error) {
    return rejectWithValue(null);
  }
});

const initialState: AuthState = {
  token: localStorage.getItem('token') || '',
  isAuthenticated: localStorage.getItem('token') !== '',
  profile: localStorage.getItem('token') !== '' ? profile : null,
  loading: false,
  errorRegistration: null,
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
    registrationFailure: (state, action: PayloadAction<ServerErrors>) => {
      state.loading = false;
      state.errorRegistration = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state, action) => {
        state.loading = true;
        state.errorRegistration = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        console.error(action.payload);
      })
      .addCase(fetchRegistration.fulfilled, (state, action: PayloadAction<AuthResult>) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(fetchRegistration.rejected, (state, action: PayloadAction<ServerErrors>) => {
        state.loading = false;
        state.errorRegistration = action.payload;
      });
  },
});

export const { setToken, clearToken, clearProfile, registrationStart, registrationSuccess, registrationFailure } =
  authSlice.actions;

export default authSlice.reducer;
