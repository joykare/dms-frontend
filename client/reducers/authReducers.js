import { Map, fromJS } from 'immutable';
import * as actionTypes from '../actions/authActions';

export const INITIAL_STATE = Map({
  isAuthenticated: false,
  isFetching: false,
  credentials: Map({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }),
  user: null,
  error: null
});

export default function(state = INITIAL_STATE, action ) {
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
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
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
  default:
    return state;
  }
}
