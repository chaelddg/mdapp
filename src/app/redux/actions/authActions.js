import axios from 'axios';
import * as types from './actionTypes';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

axios.defaults.baseURL = 'http://localhost:4000/api';

export function authenticateLogin(credentials) {
	return function (dispatch) {
		dispatch(beginAjaxCall());
		return axios.post(`/auth/login`, credentials)
			.then(authResponse => {
				dispatch({type: types.AUTHENTICATE_LOGIN_SUCCESS});
			})
			.catch(authError => {
				dispatch(ajaxCallError());
				throw(authError);
			});
	}
}
