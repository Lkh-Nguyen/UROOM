import 'regenerator-runtime/runtime';
import {all} from 'redux-saga/effects';
import AuthSaga from './auth/saga';
// import CustomerSaga from './customer/saga';

export default function* rootSaga() {
  yield all([
    AuthSaga(),
    // CustomerSaga()
  ]);
}
