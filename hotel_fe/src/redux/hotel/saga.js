import { all, call, fork, put, takeEvery } from "@redux-saga/core/effects";
import HotelActions from "./actions";
import Factories from "./factories";

function* getFavoriteHotels() {
  yield takeEvery(HotelActions.FETCH_FAVORITE_HOTELS, function* (action) {
    const { ids, paramsQuery, onSuccess, onFailed, onError } = action.payload;

    try {
      const response = yield call(() =>
        Factories.fetch_favorite_hotel(ids, paramsQuery)
      );

      console.log("status: ", response?.status);
      console.log("data: ", response?.data?.hotels);

      if (response?.status === 200) {
        const hotels = response.data.hotels;

        yield put({
          type: HotelActions.FETCH_FAVORITE_HOTELS_SUCCESS,
          payload: hotels,
        });

        onSuccess && onSuccess(hotels);
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
function* getAllHotels() {
  yield takeEvery(HotelActions.FETCH_ALL_HOTEL, function* (action) {
    const { onSuccess, onFailed, onError } = action.payload || {};

    try {
      const response = yield call(() => Factories.get_all_hotels());

      console.log("Get all hotels response:", response);

      if (response?.status === 200) {
        const hotels = response.data.hotels;

        yield put({
          type: HotelActions.FETCH_All_HOTEL_SUCCESS,
          payload: hotels,
        });

        onSuccess?.(hotels);
      } else {
        onFailed?.(response?.data?.message || "Failed to get hotels");
      }
    } catch (error) {
      const status = error.response?.status;
      const msg = error.response?.data?.message || "Something went wrong";

      console.log("Get all hotels error:", msg);
    }
  });
}
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
        onFailed?.(
          response?.data?.message || "Không lấy được thông tin khách sạn"
        );
      }
    } catch (error) {
      const status = error.response?.status;
      const msg =
        error.response?.data?.message ||
        "Có lỗi xảy ra khi lấy thông tin khách sạn";

      console.log("Owner hotel error:", msg);

      if (status >= 500) {
        onError?.(error);
      } else {
        onFailed?.(msg);
      }
    }
  });
}
function* getTop3Hotels() {
  yield takeEvery(HotelActions.FETCH_TOP3_HOTEL, function* (action) {
    const { onSuccess, onFailed, onError } = action.payload;

    try {
      const response = yield call(() => Factories.get_top3_hotels());

      console.log("Top 3 hotels response:", response);

      if (response?.status === 200) {
        const topHotels = response.data || [];

        yield put({
          type: HotelActions.FETCH_TOP3_HOTEL_SUCCESS,
          payload: topHotels,
        });

        onSuccess?.(topHotels);
      } else {
        onFailed?.(response?.data?.message || "Không lấy được top 3 khách sạn");
      }
    } catch (error) {
      const status = error.response?.status;
      const msg =
        error.response?.data?.message ||
        "Có lỗi xảy ra khi lấy top 3 khách sạn";
    }
  });
}
function* updateHotel() {
  yield takeEvery(HotelActions.UPDATE_HOTEL, function* (action) {
    const { hotelId, updateData, onSuccess, onFailed, onError } =
      action.payload || {};

    if (!hotelId) {
      onFailed?.("Hotel ID không được để trống");
      return;
    }

    try {
      const response = yield call(() =>
        Factories.updateHotel(hotelId, updateData)
      );

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
      const msg =
        error.response?.data?.message || "Có lỗi xảy ra khi cập nhật khách sạn";

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
    fork(getFavoriteHotels),
    fork(getAllHotels),
    fork(getTop3Hotels),
    fork(getOwnerHotel),
    fork(updateHotel),
  ]);
}
