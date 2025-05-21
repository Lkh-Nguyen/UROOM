import { all, call, fork, put, takeEvery } from "@redux-saga/core/effects";
import HotelActions from "./actions";
import Factories from "./factories";

function* getOwnerHotel() {
  yield takeEvery(HotelActions.FETCH_OWNER_HOTEL, function* (action) {
    const { onSuccess, onFailed, onError } = action.payload || {};

    try {
      const response = yield call(() => Factories.fetchOwnerHotel());

      console.log("Owner hotel response:", response);

      if (response?.status === 200) {
        const ownerHotel = response.data;

        yield put({
          type: HotelActions.FETCH_OWNER_HOTEL_SUCCESS,
          payload: ownerHotel,
        });

        onSuccess?.(ownerHotel);
      } else {
        onFailed?.(response?.data?.message || "Không lấy được thông tin khách sạn");
      }
    } catch (error) {
      const status = error.response?.status;
      const msg = error.response?.data?.message || "Có lỗi xảy ra khi lấy thông tin khách sạn";

      console.log("Owner hotel error:", msg);

      if (status >= 500) {
        onError?.(error);
      } else {
        onFailed?.(msg);
      }
    }
  });
}
function* updateHotel() {
  yield takeEvery(HotelActions.UPDATE_HOTEL, function* (action) {
    const { hotelId, updateData, onSuccess, onFailed, onError } = action.payload || {};

    if (!hotelId) {
      onFailed?.("Hotel ID không được để trống");
      return;
    }

    try {
      const response = yield call(() => Factories.updateHotel(hotelId, updateData));

      if (response?.status === 200) {
        yield put({
          type: HotelActions.UPDATE_HOTEL_SUCCESS,
          payload: response.data.hotel,
        });
        onSuccess?.(response.data.hotel);
      } else {
        onFailed?.(response?.data?.message || "Cập nhật khách sạn thất bại");
      }
    } catch (error) {
      const status = error.response?.status;
      const msg = error.response?.data?.message || "Có lỗi xảy ra khi cập nhật khách sạn";

      if (status >= 500) {
        onError?.(error);
      } else {
        onFailed?.(msg);
      }
    }
  });
}


export default function* userSaga() {
  yield all([
    fork(getOwnerHotel),
    fork(updateHotel),
   
  ]);
}
