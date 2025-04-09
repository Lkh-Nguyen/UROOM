import { combineReducers } from 'redux';
import AuthReducer from './auth/reducer';
// import SalaryReducer from '@redux/salary/reducer'

const rootReducer = combineReducers({
    Auth: AuthReducer
});

export default rootReducer;