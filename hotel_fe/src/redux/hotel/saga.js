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
function* updateHotelServiceStatus() {
  yield takeEvery(HotelActions.UPDATE_HOTEL_SERVICE_STATUS, function* (action) {
    const { hotelId, statusActive, serviceId, onSuccess, onFailed, onError } = action.payload || {};

    if (!hotelId || !serviceId) {
      onFailed?.("Hotel ID và Service ID không được để trống");
      return;
    }

    // Chuẩn bị dữ liệu gửi lên API
    const updateData = { statusActive };

    try {
      const response = yield call(() =>
        Factories.updateHotelServiceStatus(hotelId, updateData, serviceId)
      );
      if (response?.status === 200) {
        onSuccess?.(response.data.service);
      } else {
        onFailed?.(response?.data?.message || "Cập nhật trạng thái dịch vụ thất bại");
      }
    } catch (error) {
      const status = error.response?.status;
      const msg = error.response?.data?.message || "Có lỗi xảy ra khi cập nhật trạng thái dịch vụ";

      if (status >= 500) {
        onError?.(error);
      } else {
        onFailed?.(msg);
      }
    }
  });
}
function* createHotelService() {
  yield takeEvery(HotelActions.CREATE_HOTEL_SERVICE, function* (action) {
    const { serviceData, onSuccess, onFailed, onError } = action.payload || {};

    if (!serviceData?.hotelId) {
      onFailed?.("Thiếu hotelId trong dữ liệu dịch vụ");
      return;
    }

    try {
      const response = yield call(() => Factories.createHotelService(serviceData));

      if (response?.status === 201) {
        yield put({
          type: HotelActions.CREATE_HOTEL_SERVICE_SUCCESS,
          payload: response.data.service,
        });
        onSuccess?.(response.data.service);
      } else {
        onFailed?.(response?.data?.message || "Tạo dịch vụ thất bại");
      }
    } catch (error) {
      const status = error.response?.status;
      const msg = error.response?.data?.message || "Có lỗi xảy ra khi tạo dịch vụ";

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
    fork(updateHotelServiceStatus),
    fork(createHotelService),
   
  ]);
}
