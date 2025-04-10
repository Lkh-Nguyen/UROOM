import { all, call, fork, put, takeEvery } from "@redux-saga/core/effects";
import AuthActions from "./actions";
import Factories from "./factories";
import { setToken, setUser } from "utils/handleToken";

function* login() {
  yield takeEvery(AuthActions.LOGIN, function* (action) {
    const { data, onSuccess, onFailed, onError } = action.payload;
    try {
      const response = yield call(() => Factories.login(data));
      if (response?.status === 200) {
        setToken(response.data.Data.token);
        setUser(response.data.Data.user);
        yield put({
          type: AuthActions.LOGIN_SUCCESS,
          payload: { user: response.data.Data.user },
        });
        onSuccess && onSuccess(response.data.Data.user);
      }
    } catch (error) {
      const status = error.response?.status;
      const msg = error.response?.data?.MsgNo;
      console.log("status: ", status);
      console.log("msg: ", msg);
      // 👇 Phân biệt xử lý theo loại lỗi
      if (status >= 500) {
        onError && onError(error); // Lỗi server
      } else {
        onFailed && onFailed(msg); // Lỗi logic như 401, 403
      }
    }
  });
}
function* update_profile() {
  yield takeEvery(AuthActions.UPDATE_PROFILE, function* (action) {
    const { data, onSuccess, onFailed, onError } = action.payload;

    try {
      const response = yield call(() => Factories.update_profile(data));

      if (response?.status === 200) {
        const { user } = response.data.Data;

        // Cập nhật token và user vào localStorage

        setUser(user);

        // Cập nhật vào redux store
        yield put({
          type: AuthActions.UPDATE_PROFILE_SUCCESS,
          payload: { user },
        });

        onSuccess && onSuccess(user);
      }
    } catch (error) {
      const status = error.response?.status;
      const msg = error.response?.data?.MsgNo;

      console.log("status: ", status);
      console.log("msg: ", msg);

      if (status >= 500) {
        onError && onError(error);
      } else {
        onFailed && onFailed(msg);
      }
    }
  });
}
function* change_password() {
  yield takeEvery(AuthActions.CHANGE_PASSWORD, function* (action) {
    const { data, onSuccess, onFailed, onError } = action.payload;

    try {
      const response = yield call(() => Factories.change_password(data));

      if (response?.status === 200) {
        yield put({
          type: AuthActions.CHANGE_PASSWORD_SUCCESS,
        });

        onSuccess && onSuccess();
      }
    } catch (error) {
      const status = error.response?.status;
      const msg = error.response?.data?.MsgNo;

      console.log("status: ", status);
      console.log("msg: ", msg);

      if (status >= 500) {
        onError && onError(error);
      } else {
        onFailed && onFailed(msg);
      }
    }
  });
}


export default function* userSaga() {
  yield all([fork(login), fork(update_profile),fork(change_password)]);
}
