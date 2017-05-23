import { combineReducers } from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import user from './userReducer';
import authMessage from './authReducer';
import patients from './patientReducer';

const rootReducer = combineReducers({
	ajaxCallsInProgress,
	user,
	authMessage,
  patients
});

export default rootReducer;
