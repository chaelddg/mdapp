import axios from '../../../helpers/request';
import localdb from '../../../helpers/localdb';
import * as types from './actionTypes';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

export function clearPatientList () {
  return {
    type: types.CLEAR_PATIENT_LIST
  }
}

export function getPatientList() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return axios.get('/patient/list', {
      headers: {
        'Authorization': localdb.getItem('token')
      }
    })
      .then(patientListResponse => {
        dispatch({
          type: types.GET_PATIENT_LIST_SUCCESS,
          payload: patientListResponse.data.data
        });
      })
      .catch(patientListError => {
        dispatch(ajaxCallError());
        throw(patientListError);
      });
  }
}
