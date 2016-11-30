import * as constants from '../constants';
import * as tokenUtils from '../utils/tokenUtility';
import request from 'superagent';

export function roleRequest() {
  return {
    type: constants.ROLE_GET_REQUEST
  };
}

export function roleSuccess(roles) {
  return {
    type: constants.ROLE_GET_SUCCESS,
    roles
  };
}

export function roleFailure(error) {
  return {
    type: constants.ROLE_GET_FAILURE,
    error
  };
}

export function fetchRoles() {
  return dispatch => {
    dispatch(roleRequest());
    return (
      request
        .get('/api/roles')
        .set('x-access-token', tokenUtils.getAuthToken())
        .then((response) => {
          dispatch(roleSuccess(response.body));
        }).catch((err) => {
          dispatch(roleFailure(err));
        })
    );
  };
}
