import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authReducer(state = initialState.authMessage, action) {
	switch (action.type) {

    case types.AUTHENTICATE_LOGIN_FAILED:
      return Object.assign({}, action.payload);

    case types.CLEAR_AUTH_MESSAGE:
      state = {};
      return state;

		default:
			return state;
	}
}
