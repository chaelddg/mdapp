import { combineReducers } from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import user from './userReducer';
import authMessage from './authReducer';

const rootReducer = combineReducers({
	ajaxCallsInProgress,
	user,
	authMessage
});

export default rootReducer;
