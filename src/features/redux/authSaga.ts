import { PayloadAction } from '@reduxjs/toolkit';
import { ResultFetchAuth } from '../forms/AuthForm/types';
import { registrationFailure, registrationSuccess } from './AuthSlice';
import { takeLatest } from 'redux-saga/effects';
import { fetchAuthData } from '../forms/AuthForm/registration';
import { RegistationData } from './types';

type RegistrationAction = PayloadAction<RegistationData>;

function* fetchRegistrationSaga(email: string, password: string) {
  try {
    const authData: ResultFetchAuth = yield fetchAuthData(email, password);
    return authData;
  } catch (error) {
    return { serverErrors: error };
  }
}

export function* handleRegistration(action: RegistrationAction) {
  const { email, password } = action.payload;
  const result: ResultFetchAuth = yield fetchRegistrationSaga(email, password);
  const { authResult, serverErrors } = result;

  if (authResult) {
    yield registrationSuccess(authResult.token);
  } else if (serverErrors) {
    const firstError = serverErrors.errors[0];
    yield registrationFailure(firstError.message);
  }
}

export function* watchRegistration() {
  yield takeLatest('auth/registrationStart', handleRegistration);
}
