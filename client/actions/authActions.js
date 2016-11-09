import * as constants from '../constants';
// import fetch from 'isomorphic-fetch';
import request from 'superagent';

export function loginSuccess(user) {
  return {
    type: constants.LOGIN_SUCCESS,
    user
  };
}

export function loginFailure(error) {
  return {
    type: constants.LOGIN_FAILURE,
    error
  };
}

export function loginRequest(credentials) {
  return {
    type: constants.LOGIN_REQUEST,
    credentials
  };
}

export function signupSuccess(user) {
  return {
    type: constants.SIGNUP_SUCCESS,
    user
  };
}

export function signupFailure(error) {
  return {
    type: constants.SIGNUP_FAILURE,
    error
  };
}

export function signupRequest(credentials) {
  return {
    type: constants.SIGNUP_REQUEST,
    credentials
  };
}

export function updateCredentials(credentials) {
  return {
    type: constants.UPDATE_CREDENTIALS,
    credentials
  };
}

export function loginUser(credentials) {
  return dispatch => {
    dispatch(loginRequest(credentials));
    return (
      request
        .post('/api/users/login')
        .send(credentials)
        .then((response) => {
          dispatch(loginSuccess(response.body));
        }).catch((err) => {
          dispatch(loginFailure(err.response.body));
        })
    );
  };
}

export function signupUser(credentials) {
  return dispatch => {
    dispatch(signupRequest(credentials));
    return (
      request
        .post('/api/users')
        .send(credentials)
        .then((response) => {
          dispatch(signupSuccess(response.body));
        }).catch((err) => {
          dispatch(signupFailure(err.response.body));
        })
    );
  };
}
