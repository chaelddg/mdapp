import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.accounts, action) {
  switch (action.type) {
    case types.GET_ACCOUNT_LIST_SUCCESS:
      return Object.assign({}, state, action.payload);

    case types.CLEAR_ACCOUNT_LIST:
      state = {};
      return state;

    default:
      return state;
  }
}
