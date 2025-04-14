import { all, call, fork, put, takeEvery } from "@redux-saga/core/effects";
import HotelActions from "./actions";
import Factories from "./factories";

function* getFavoriteHotels() {
  yield takeEvery(HotelActions.FETCH_FAVORITE_HOTELS, function* (action) {
    const { ids, onSuccess, onFailed, onError } = action.payload;

    try {
      const response = yield call(() => Factories.fetch_favorite_hotel(ids));

      console.log('status: ', response?.status);
      console.log('data: ', response?.data?.hotels);

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
function* removeFavoriteHotel() {
  yield takeEvery(HotelActions.REMOVE_FAVORITE_HOTEL_REQUEST, function* (action) {
    const { hotelId, onSuccess, onFailed, onError } = action.payload;

    try {
      const response = yield call(() => Factories.remove_favorite_hotel(hotelId));

      console.log('Remove favorite hotel status:', response?.status);

      if (response?.status === 200) {
        yield put({
          type: HotelActions.REMOVE_FAVORITE_HOTEL_SUCCESS,
          payload: hotelId, 
        });

        onSuccess?.();
      } else {
        onFailed?.(response?.data?.message || "Failed to remove favorite hotel");
      }
    } catch (error) {
      const status = error.response?.status;
      const msg = error.response?.data?.message || "Something went wrong";

      console.log("Remove favorite hotel error status:", status);
      console.log("Remove favorite hotel error message:", msg);

      if (status >= 500) {
        onError?.(error);
      } else {
        onFailed?.(msg);
      }
    }
  });
}
function* getHotelDetails() {
  yield takeEvery(HotelActions.FETCH_DETAIL_HOTEL, function* (action) {
    const { hotelId, onSuccess, onFailed, onError } = action.payload;

    try {
      const response = yield call(() => Factories.fetch_detail_hotel(hotelId));
      if (response?.status === 200) {
        const hotel = response.data.hotel;
        yield put({
          type: HotelActions.FETCH_DETAIL_HOTEL_SUCCESS,
          payload: hotel,
        });
        onSuccess?.(hotel);
      } else {
        onFailed?.("Failed to fetch hotel details");
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      const status = error.response?.status;
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
    fork(removeFavoriteHotel),
    fork(getHotelDetails),
  ]);
}
