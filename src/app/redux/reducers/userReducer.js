import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.user, action) {
	switch (action.type) {
		case types.LOAD_USER_DETAILS_SUCCESS:
			return Object.assign({}, state, action.payload);

		case types.CLEAR_USER_DETAILS:
			return action.details;

		default:
			return state;
	}
}
