import {Map, fromJS, List} from 'immutable';
import * as actionTypes from '../constants';

export const INITIAL_ROLE_STATE = Map({
  isFetching: false,
  roles: List(),
  error: null
});

export default function(state = INITIAL_ROLE_STATE, action) {
  switch(action.type) {
  case actionTypes.ROLE_GET_REQUEST:
    return state.merge(Map({
      isFetching: true,
      error: null
    }));
  case actionTypes.ROLE_GET_SUCCESS:
    return state.merge(Map({
      isFetching: false,
      roles: fromJS(action.roles),
      error: null
    }));
  case actionTypes.ROLE_GET_FAILURE:
    return state.merge(Map({
      isFetching: false,
      error: fromJS(action.error)
    }));
  default:
    return state;
  }
}
