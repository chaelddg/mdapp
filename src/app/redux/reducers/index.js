import { combineReducers } from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import user from './userReducer';

const rootReducer = combineReducers({
	ajaxCallsInProgress,
	user
});

export default rootReducer;
