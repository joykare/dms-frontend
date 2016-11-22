import * as constants from '../constants';
import * as tokenUtils from '../utils/tokenUtility';
import request from 'superagent';

export function userRequest() {
  return {
    type: constants.USER_GET_REQUEST
  };
}

export function userSuccess(users) {
  return {
    type: constants.USER_GET_SUCCESS,
    users
  };
}

export function userFailure(error) {
  return {
    type: constants.USER_GET_FAILURE,
    error
  };
}

export function userDetailsRequest(userId) {
  return {
    type: constants.USER_DETAILS_REQUEST,
    userId
  };
}

export function userDetailsSuccess(user) {
  return {
    type: constants.USER_DETAILS_SUCCESS,
    user
  };
}

export function userDetailsFailure(error) {
  return {
    type: constants.USER_DETAILS_FAILURE,
    error
  };
}

export function userUpdateRequest(updates) {
  return {
    type: constants.USER_UPDATE_REQUEST,
    updates
  };
}

export function userUpdateSuccess(user) {
  return {
    type: constants.USER_UPDATE_SUCCESS,
    user
  };
}

export function userUpdateFailure(error) {
  return {
    type: constants.USER_UPDATE_FAILURE,
    error
  };
}

export function fetchAllUsers() {
  return dispatch => {
    dispatch(userRequest());
    request
      .get('/api/users/')
      .set('x-access-token', tokenUtils.getAuthToken())
      .then(response => {
        dispatch(userSuccess(response.body));
      }).catch(err => {
        dispatch(userFailure(err));
      });
  };
}

export function fetchUser(userId) {
  return dispatch => {
    dispatch(userDetailsRequest(userId));
    return(
      request
      .get(`/api/users/${userId}`)
      .set('x-access-token', tokenUtils.getAuthToken())
      .then(response => {
        dispatch(userDetailsSuccess(response.body));
      }).catch(err => {
        dispatch(userDetailsFailure(err));
      })
    );
  };
}

export function editUser(userId) {
  return dispatch => {
    dispatch(userDetailsRequest());
    request
      .get('/api/users/' + userId)
      .set('x-access-token', tokenUtils.getAuthToken())
      .then(response => {
        dispatch(userDetailsSuccess(response));
      }).catch(err => {
        dispatch(userDetailsFailure(err));
      });
  };
}
