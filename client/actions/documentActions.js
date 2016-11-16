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

export function docCreateRequest(doc) {
  return {
    type: constants.DOC_CREATE_REQUEST,
    doc
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

export function toggleCreateDocument() {
  return {
    type: constants.TOGGLE_CREATE_DOC
  };
}

export function toggleUpdateDocument(doc) {
  return {
    type: constants.TOGGLE_UPDATE_DOC,
    doc
  };
}

export function toggleDeleteDocument(doc) {
  return {
    type: constants.TOGGLE_DELETE_DOC,
    doc
  };
}

export function toggleClose() {
  return {
    type: constants.TOGGLE_CLOSE
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

export function docDeleteRequest(doc) {
  return {
    type: constants.DOC_DELETE_REQUEST,
    doc
  };
}

export function docDeleteSuccess(doc) {
  return {
    type: constants.DOC_DELETE_SUCCESS,
    doc
  };
}

export function docDeleteFailure(error) {
  return {
    type: constants.DOC_DELETE_FAILURE,
    error
  };
}


export function fetchDoc() {
  return dispatch => {
    dispatch(docRequest());
    return (
      request
        .get('/api/documents/')
        .set('x-access-token', tokenUtils.getAuthToken())
        .then(response => {
          dispatch(docSuccess(response.body));
        }).catch(err => {
          dispatch(docFailure(err));
        })
    );
  };
}

export function createDoc(doc) {
  return dispatch => {
    dispatch(docCreateRequest(doc));
    return (
      request
        .post('/api/documents/')
        .set('x-access-token', tokenUtils.getAuthToken())
        .send(doc)
        .then(response => {
          dispatch(docCreateSuccess(response.body));
        }).catch(err => {
          dispatch(docCreateFailure(err));
        })
    );
  };
}

export function editDoc(doc) {
  return dispatch => {
    dispatch(docUpdateRequest(doc));
    return (
      request
        .put(`/api/documents/${doc._id}`)
        .set('x-access-token', tokenUtils.getAuthToken())
        .send(doc)
        .then(response => {
          dispatch(docUpdateSuccess(response.body));
        }).catch(err => {
          dispatch(docUpdateFailure(err));
        })
    );
  };
}

export function deleteDoc(doc) {
  return dispatch => {
    dispatch(docDeleteRequest(doc));
    return (
      request
        .del(`/api/documents/${doc._id}`)
        .set('x-access-token', tokenUtils.getAuthToken())
        .then(response => {
          dispatch(docDeleteSuccess(response.body));
        }).catch(err => {
          dispatch(docDeleteFailure(err));
        })
    );
  };
}
