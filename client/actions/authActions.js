import * as constants from '../constants';

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
