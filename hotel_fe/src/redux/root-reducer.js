import { combineReducers } from 'redux';
import AuthReducer from './auth/reducer';
import HotelReducer from './hotel/reducer';
import HotelservicesReducer from './Hotelservices/reducer';


const rootReducer = combineReducers({
    Auth: AuthReducer,
    Hotel: HotelReducer,
    Hotelservices:HotelservicesReducer
});

export default rootReducer;