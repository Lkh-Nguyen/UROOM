import { combineReducers } from 'redux';
import AuthReducer from './auth/reducer';
import SearchReducer from './search/reducer';
import HotelReducer from './hotel/reducer';
import RoomReducer from './room/reducer';
import FeedbackReducer from './feedback/reducer';
import ReservationReducer from './reservations/reducer';

const rootReducer = combineReducers({
    Auth: AuthReducer,
    Search: SearchReducer,
    hotel: HotelReducer,
    Room: RoomReducer,
    Feedback:FeedbackReducer,
    Reservation:ReservationReducer
});

export default rootReducer;