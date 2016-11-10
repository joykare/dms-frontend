import {Map, fromJS} from 'immutable';
import * as actionTypes from '../constants';

export const INITIAL_STATE = Map({
  isAuthenticated: false,
  isFetching: false,
  credentials: Map({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  }),
  user: null,
  error: null
});

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actionTypes.LOGIN_REQUEST:
  case actionTypes.SIGNUP_REQUEST:
    return(
      state.merge(Map({
        isAuthenticated: false,
        isFetching: true,
        credentials: fromJS(action.credentials)
      }))
    );
  case actionTypes.LOGIN_SUCCESS:
  case actionTypes.SIGNUP_SUCCESS:
    return(
      state.merge(Map({
        isAuthenticated: true,
        isFetching: false,
        credentials: Map({
          first: '',
          last: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: ''
        }),
        user: fromJS(action.user),
        error: null
      }))
    );
  case actionTypes.LOGIN_FAILURE:
  case actionTypes.SIGNUP_FAILURE:
    return(
      state.merge(Map({
        isAuthenticated: false,
        isFetching: false,
        user: null,
        error: fromJS(action.error)
      }))
    );
  case actionTypes.UPDATE_CREDENTIALS:
    return (
      state.merge(Map({
        credentials: fromJS(action.credentials)
      }))
    );
  default:
    return state;
  }
}
