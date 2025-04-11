import { combineReducers } from 'redux';
import AuthReducer from './auth/reducer';
import SearchReducer from './search/reducer';

const rootReducer = combineReducers({
    Auth: AuthReducer,
    Search: SearchReducer,
});

export default rootReducer;