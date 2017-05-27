import { combineReducers } from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import user from './userReducer';
import authMessage from './authReducer';
import patients from './patientReducer';
import accounts from './accountReducer';

const rootReducer = combineReducers({
	ajaxCallsInProgress,
	user,
	authMessage,
  patients,
  accounts
});

export default rootReducer;
