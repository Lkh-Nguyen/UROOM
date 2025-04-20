import { combineReducers } from 'redux';
import AuthReducer from './auth/reducer';
import SearchReducer from './search/reducer';
import HotelReducer from './hotel/reducer';
import RoomReducer from './room/reducer';

const rootReducer = combineReducers({
    Auth: AuthReducer,
    Search: SearchReducer,
    hotel: HotelReducer,
    Room: RoomReducer
});

export default rootReducer;