import {Map, fromJS, List} from 'immutable';
import * as actionTypes from '../constants';

export const INITIAL_USER_STATE = Map({
  isFetching: false,
  users: List(),
  userDetails: Map({
    _id: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  })
});

export default function(state = INITIAL_USER_STATE, action) {
  switch (action.type) {
  case actionTypes.USER_GET_REQUEST:
  case actionTypes.USER_UPDATE_REQUEST:
    return(
      state.merge(Map({
        isFetching: true,
        userDetails: INITIAL_USER_STATE.getIn(['userDetails'])
      }))
    );
  case actionTypes.USER_GET_SUCCESS:
    return (
      state.merge(Map({
        isFetching: false,
        userDetails: INITIAL_USER_STATE.getIn(['userDetails']),
        users: fromJS(action.users)
      }))
    );
  case actionTypes.USER_UPDATE_SUCCESS:
    return (
      state.merge(Map({
        isFetching: false,
        userDetails: fromJS(action.user)
      }))
    );
  default:
    return state;
  }
}
