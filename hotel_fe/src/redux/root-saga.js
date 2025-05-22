import 'regenerator-runtime/runtime';
import {all} from 'redux-saga/effects';
import AuthSaga from './auth/saga'; 
import HotelSaga from './hotel/saga'; 

export default function* rootSaga() {
  yield all([
    AuthSaga(),
    HotelSaga(),
  ]);
}
