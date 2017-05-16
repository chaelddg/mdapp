import axios from '../../../helpers/request';
import * as types from './actionTypes';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';
import { getUserDetails } from './userActions';

export function authenticateLogin(credentials) {
	return function (dispatch) {
		dispatch(beginAjaxCall());
		return axios.post(`/auth/login`, credentials)
			.then(authResponse => {
				dispatch({type: types.AUTHENTICATE_LOGIN_SUCCESS});
				localStorage.setItem('token', authResponse.data.token);
				localStorage.setItem('id', authResponse.data.id);
				dispatch(getUserDetails(authResponse.data.id));
			})
			.catch(authError => {
				dispatch(ajaxCallError());
				throw(authError);
			});
	}
}
