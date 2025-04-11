import 'regenerator-runtime/runtime';
import {all} from 'redux-saga/effects';
import AuthSaga from './auth/saga';
import SearchSaga from './search/saga';

export default function* rootSaga() {
  yield all([
    AuthSaga(),
    SearchSaga(),
  ]);
}
