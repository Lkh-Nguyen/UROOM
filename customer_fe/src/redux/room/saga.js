import { all, call, fork, put, takeEvery } from "@redux-saga/core/effects";
import RoomActions from "./actions";
import Factories from "./factories";


function* getRoomsByHotel() {
  yield takeEvery(RoomActions.FETCH_ROOM, function* (action) {
    const { hotelId, onSuccess, onFailed, onError } = action.payload;

    try {
      const response = yield call(Factories.fetch_room, hotelId); 
      console.log(response?.status)
      console.log("rooms", response?.rooms)
      if (response?.status === 200) {
        yield put({
          type: RoomActions.FETCH_ROOM_SUCCESS,
          payload: response.data.rooms, 
        });

        onSuccess && onSuccess(response.data.rooms); 
      } else {
        throw new Error('Failed to fetch rooms');
      }
    } catch (error) {
      console.error("Error fetching rooms: ", error)
    }
  });
}


export default function* roomSaga() {
  yield all([fork(getRoomsByHotel)]); 
}
