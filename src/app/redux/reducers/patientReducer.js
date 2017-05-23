import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.patients, action) {
  switch (action.type) {
    case types.GET_PATIENT_LIST_SUCCESS:
      state = state.concat(action.payload);
      return state;

    case types.CLEAR_PATIENT_LIST:
      state = [];
      return state;

    default:
      return state;
  }
}
