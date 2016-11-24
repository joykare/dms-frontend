import * as constants from '../constants';
import request from 'superagent';
import * as tokenUtils from '../utils/tokenUtility';

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

export function validationSuccess() {
  return {
    type: constants.VALIDATE_AUTH_SUCCESS
  };
}

export function validationFailure(error) {
  return {
    type: constants.VALIDATE_AUTH_FAILURE,
    error
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
          tokenUtils.setAuthToken(response.body.token);
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
          tokenUtils.setAuthToken(response.body.token);
          dispatch(signupSuccess(response.body));
        }).catch((err) => {
          dispatch(signupFailure(err.response.body));
        })
    );
  };
}
