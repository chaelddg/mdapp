import axios from '../../../helpers/request';
import localdb from '../../../helpers/localdb';
import * as types from './actionTypes';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';
import { getUserDetails } from './userActions';

export function setAuthMessage (message) {
	return {
		type: types.AUTHENTICATE_LOGIN_FAILED,
		message
	}
}

export function clearAuthMessage () {
	return {
		type: types.CLEAR_AUTH_MESSAGE
	}
}

export function authenticateLogin(credentials) {
	return function (dispatch) {
		dispatch(beginAjaxCall());
		return axios.post(`/auth/login`, credentials)
			.then(authResponse => {
				dispatch({type: types.AUTHENTICATE_LOGIN_SUCCESS});
				if (authResponse.data.success) {
					localdb.clear();
					localdb.setItem('token', authResponse.data.token);
					localdb.setItem('id', authResponse.data.id);
					dispatch(clearAuthMessage());
					dispatch(getUserDetails(authResponse.data.id));
				} else {
					dispatch(setAuthMessage(authResponse.data.message));
				}
			})
			.catch(authError => {
				dispatch(ajaxCallError());
				throw(authError);
			});
	}
}
