import { all, fork } from 'redux-saga/effects';
import { watchRegistration } from './authSaga';

export function* rootSaga() {
  yield all([fork(watchRegistration)]);
}
