import * as constants from '../constants';
import * as tokenUtils from '../utils/tokenUtility';
import request from 'superagent';

export function docRequest() {
  return {
    type: constants.DOC_GET_REQUEST
  };
}

export function docSuccess(doc) {
  return {
    type: constants.DOC_GET_SUCCESS,
    doc
  };
}

export function docFailure(error) {
  return {
    type: constants.DOC_GET_FAILURE,
    error
  };
}

export function docCreateRequest() {
  return {
    type: constants.DOC_CREATE_REQUEST
  };
}

export function docCreateSuccess(doc) {
  return {
    type: constants.DOC_CREATE_SUCCESS,
    doc
  };
}

export function docCreateFailure(error) {
  return {
    type: constants.DOC_CREATE_FAILURE,
    error
  };
}

export function docUpdateRequest(updates) {
  return {
    type: constants.DOC_UPDATE_REQUEST,
    updates
  };
}

export function docUpdateSuccess(doc) {
  return {
    type: constants.DOC_UPDATE_SUCCESS,
    doc
  };
}

export function docUpdateFailure(error) {
  return {
    type: constants.DOC_UPDATE_FAILURE,
    error
  };
}

export function fetchDoc() {
  return dispatch => {
    dispatch(docRequest());
    request
      .get('/api/documents/')
      .set('x-access-token', tokenUtils.getAuthToken())
      .then(response => {
        console.log('Fetch results',response.body);
        dispatch(docSuccess(response.body));
      }).catch(err => {
        dispatch(docFailure(err));
      });
  };
}

export function createDoc(doc) {
  return dispatch => {
    dispatch(docCreateRequest());
    request
      .post('/api/documents/')
      .set('x-access-token', tokenUtils.getAuthToken())
      .send(doc)
      .then(response => {
        console.log(response);
        dispatch(docCreateSuccess(response.body));
      }).catch(err => {
        dispatch(docCreateFailure(err));
      });
  };
}

export function editDoc(userId) {
  return dispatch => {
    dispatch(docUpdateRequest());
    request
      .get('/api/users/' + userId)
      .set('x-access-token', tokenUtils.getAuthToken())
      .then(response => {
        dispatch(docUpdateSuccess(response));
      }).catch(err => {
        dispatch(docUpdateFailure(err));
      });
  };
}
