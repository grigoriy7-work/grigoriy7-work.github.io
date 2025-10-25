import { all, fork } from 'redux-saga/effects';
import { registrationStart, registrationSuccess, registrationFailure } from './AuthSlice';
import { watchRegistration } from './authSaga';

export function* rootSaga() {
  yield all([fork(watchRegistration)]);
}
