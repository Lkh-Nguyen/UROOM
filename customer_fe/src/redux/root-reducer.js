import { combineReducers } from 'redux';
import AuthReducer from './auth/reducer';
// import CustomerReducer from './customer/reducer';
// import SalaryReducer from '@redux/salary/reducer'

const rootReducer = combineReducers({
    Auth: AuthReducer,
    // Customer: AuthReducer
});

export default rootReducer;