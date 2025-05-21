import { combineReducers } from 'redux';
import AuthReducer from './auth/reducer';
import HotelReducer from './hotel/reducer';


const rootReducer = combineReducers({
    Auth: AuthReducer,
    Hotel: HotelReducer
});

export default rootReducer;