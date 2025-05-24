import { combineReducers } from 'redux';
import AuthReducer from './auth/reducer';
import HotelReducer from './hotel/reducer';
import HotelservicesReducer from './Hotelservices/reducer';
import ReportedFeedbackReducer from "./reportedFeedback/reducer";
import ReservationReducer from "./reservation/reducer";
import FeedbackReducer from "./feedback/reducer";

const rootReducer = combineReducers({
    Auth: AuthReducer,
    Hotel: HotelReducer,
    Hotelservices:HotelservicesReducer,
    Feedback: FeedbackReducer,
    ReportedFeedback: ReportedFeedbackReducer,
    Reservation: ReservationReducer
});

export default rootReducer;
