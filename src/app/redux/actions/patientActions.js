import axios from '../../../helpers/request';
import localdb from '../../../helpers/localdb';
import * as types from './actionTypes';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

export function clearPatientList () {
  return function (dispatch) {
    dispatch({
      type: types.CLEAR_PATIENT_LIST
    })
  }
}

export function getPatientList(limit, start, search, sort, sort_key) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return axios.get(
      `/patient/list?start=${start}&limit=${limit}&search=${search || ''}&sort=${sort}&sort_key=${sort_key}`,
      {
      headers: {
        'Authorization': localdb.getItem('token')
      }
    })
    .then(patientListResponse => {
      dispatch({
        type: types.GET_PATIENT_LIST_SUCCESS,
        payload: {
          data: patientListResponse.data.data,
          count: patientListResponse.data.count
        }
      });
    })
    .catch(patientListError => {
      dispatch(ajaxCallError());
      throw(patientListError);
    });
  }
}
