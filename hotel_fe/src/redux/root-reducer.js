import { combineReducers } from "redux";
import AuthReducer from "./auth/reducer";
import FeedbackReducer from "./feedback/reducer";
import HotelReducer from "./hotel/reducer";
import ReportedFeedbackReducer from "./reportedFeedback/reducer";
import ReservationReducer from "./reservation/reducer";
const rootReducer = combineReducers({
  Auth: AuthReducer,
  Feedback: FeedbackReducer,
  ReportedFeedback: ReportedFeedbackReducer,
  Hotel: HotelReducer,
  Reservation: ReservationReducer
});

export default rootReducer;
