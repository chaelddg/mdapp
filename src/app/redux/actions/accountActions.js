import axios from '../../../helpers/request';
import localdb from '../../../helpers/localdb';
import * as types from './actionTypes';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

export function setAccountMessage (payload) {
  return {
    type: types.CREATE_USER_ACCOUNT_MESSAGE,
    payload
  }
}

export function clearCreateAccountMessage () {
  return {
    type: types.CREATE_USER_ACCOUNT_CLEAR_MESSAGE
  }
}

export function clearAccountList () {
  return function (dispatch) {
    dispatch({
      type: types.CLEAR_ACCOUNT_LIST
    })
  }
}

export function clearAccountDetails () {
  return function (dispatch) {
    dispatch({
      type: types.CLEAR_ACCOUNT_DETAILS
    })
  }
}

export function getAccountList(limit, start, search, sort, sort_key) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return axios.get(
      `/account/list?start=${start}&limit=${limit}&search=${search || ''}&sort=${sort}&sort_key=${sort_key}`,
      {
        headers: {
          'Authorization': localdb.getItem('token')
        }
      })
      .then(accountListResponse => {
        dispatch({
          type: types.GET_ACCOUNT_LIST_SUCCESS,
          payload: {
            data: accountListResponse.data.data,
            count: accountListResponse.data.count
          }
        });
      })
      .catch(accountListError => {
        dispatch(ajaxCallError());
        throw(accountListError);
      });
  }
}

export function createUserAccount(credentials) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return axios.post(`/user/create`, credentials, {
      headers: {
        'Authorization': localdb.getItem('token')
      }
    })
    .then(accountResponse => {
      dispatch({type: types.CREATE_USER_ACCOUNT_SUCCESS});
      dispatch(setAccountMessage({
        message: accountResponse.data.message,
        success: accountResponse.data.success
      }));
    })
    .catch(accountError => {
      dispatch(ajaxCallError());
      throw(accountError);
    });
  }
}

export function updateUserAccount(credentials) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return axios.put(`/user/update`, credentials, {
      headers: {
        'Authorization': localdb.getItem('token')
      }
    })
    .then(accountResponse => {
      dispatch({type: types.CREATE_USER_ACCOUNT_SUCCESS});
      dispatch(setAccountMessage({
        message: accountResponse.data.message,
        success: accountResponse.data.success
      }));
    })
    .catch(accountError => {
      dispatch(ajaxCallError());
      throw(accountError);
    });
  }
}

export function deleteUserAccount(id) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return axios.delete(`/account/delete/${id}`, {
      headers: {
        'Authorization': localdb.getItem('token')
      }
    })
    .then(accountResponse => {
      dispatch({type: types.CREATE_USER_ACCOUNT_SUCCESS});
      dispatch(setAccountMessage({
        message: accountResponse.data.message,
        success: accountResponse.data.success
      }));
    })
    .catch(accountError => {
      dispatch(ajaxCallError());
      throw(accountError);
    });
  }
}

export function getAccountDetails(id) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return axios.get(`/account/profile/${id}`, {
      headers: {
        'Authorization': localdb.getItem('token')
      }
    })
    .then(accountResponse => {
      const { data } = accountResponse;
      delete data.data.menu;
      dispatch({type: types.GET_ACCOUNT_DETAILS_SUCCESS, payload: data.data});
    })
    .catch(accountError => {
      dispatch(ajaxCallError());
      throw(accountError);
    });
  }
}
