import "regenerator-runtime/runtime";
import { all } from "redux-saga/effects";
import AuthSaga from "./auth/saga";
import FeedbackSaga from "./feedback/saga";
import HotelSaga from "./hotel/saga";
import ReportFeedbackSaga from "./reportedFeedback/saga";
import ReservationSaga from "./reservation/saga";
export default function* rootSaga() {
  yield all([
    AuthSaga(),
    FeedbackSaga(),
    HotelSaga(),
    ReportFeedbackSaga(),
    ReservationSaga(),
  ]);
}
