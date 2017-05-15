import axios from 'axios';
import * as types from './actionTypes';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

axios.defaults.baseURL = 'http://localhost:4000/api';

export function authenticateLogin(credentials) {
	return function (dispatch) {
		dispatch(beginAjaxCall());
		return axios.post(`/auth/login`, credentials)
			.then(authResponse => {
				// console.log('@@ authResponse', authResponse);
			})
			.catch(authError => {
				dispatch(ajaxCallError());
				throw(authError);
			});
	}
}
