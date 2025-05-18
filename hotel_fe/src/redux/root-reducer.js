import { combineReducers } from "redux";
import AuthReducer from "./auth/reducer";
import FeedbackReducer from "./feedback/reducer";
import HotelReducer from "./hotel/reducer";
import ReportedFeedbackReducer from "./reportedFeedback/reducer";
const rootReducer = combineReducers({
  Auth: AuthReducer,
  Feedback: FeedbackReducer,
  ReportedFeedback: ReportedFeedbackReducer,
  Hotel: HotelReducer,
});

export default rootReducer;
