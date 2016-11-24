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
  }),
  documents: List(),
  isEditing: false
});

export default function(state = INITIAL_USER_STATE, action) {
  switch (action.type) {
  case actionTypes.USER_GET_REQUEST:
    return(
      state.merge(Map({
        isFetching: true,
        userDetails: INITIAL_USER_STATE.getIn(['userDetails']),
        isEditing: false
      }))
    );
  case actionTypes.USER_UPDATE_REQUEST:
    return(
      state.merge(Map({
        isFetching: true,
        isEditing: true,
        userDetails: fromJS(action.updates)
      }))
    );
  case actionTypes.USER_GET_SUCCESS:
    return (
      state.merge(Map({
        isFetching: false,
        userDetails: INITIAL_USER_STATE.getIn(['userDetails']),
        users: fromJS(action.users),
        isEditing: false
      }))
    );
  case actionTypes.USER_UPDATE_DETAILS_REQUEST:
    return (
      state.merge(Map({
        isFetching: true,
        userDetails: fromJS(action.user),
        isEditing: false

      }))
    );
  case actionTypes.USER_UPDATE_SUCCESS:
    return (
      state.merge(Map({
        isFetching: false,
        userDetails: fromJS(action.user),
        isEditing: false
      }))
    );
  case actionTypes.USER_CLOSE_TOGGLE:
    return (
      state.merge(Map({
        isEditing: false
      }))
    );
  case actionTypes.USER_EDIT_TOGGLE:
    return (
      state.merge(Map({
        isEditing: true
      }))
    );
  case actionTypes.USER_DOC_REQUEST:
    return (
      state.merge(Map({
        isFetching: true,
        userDetails: fromJS(action.user),
        isEditing: false
      }))
    );
  case actionTypes.USER_DOC_SUCCESS:
    return (
      state.merge(Map({
        isFetching: false,
        documents: fromJS(action.documents),
        isEditing: false
      }))
    );
  case actionTypes.USER_DETAILS_REQUEST:
    return (
      state.merge(Map({
        isFetching: true,
        isEditing: true
      }))
    );
  case actionTypes.USER_DETAILS_SUCCESS:
    return (
      state.merge(Map({
        isFetching: false,
        userDetails: fromJS(action.user),
        isEditing: false
      }))
    );
  default:
    return state;
  }
}
