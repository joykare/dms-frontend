import request from 'superagent';
import mocker from 'superagent-mocker';
import thunk from 'redux-thunk';
import {expect} from 'chai';
import configureStore from 'redux-mock-store';

import * as actionCreators from '../../../client/actions/documentActions';
import * as actionTypes from '../../../client/constants';

const mock = mocker(request);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('async document actions', () => {
  const documents = [
    {document1: {
      _id: 1,
      title: 'Hey',
      content: 'Test'
    }},
    {document2: {
      _id: 2,
      title: 'Lol',
      content: 'Next test'
    }}
  ];

  beforeEach(() => {
    mock.clearRoutes();
  });

  it('simulates successful document fetch', () => {
    mock
      .get('/api/documents', () => {
        return {
          body: documents
        };
      });

    const expectedActions = [{
      type: actionTypes.DOC_GET_REQUEST
    }, {
      type: actionTypes.DOC_GET_SUCCESS,
      doc: documents
    }];

    const store = mockStore({});

    return store.dispatch(actionCreators.fetchDoc())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });

  });

  it('simulates successful document create', () => {
    let newDocument = documents[0].document1;

    mock
      .post('/api/documents', () => {
        return {
          body: newDocument
        };
      });

    const expectedActions = [{
      type: actionTypes.DOC_CREATE_REQUEST,
      doc: newDocument
    }, {
      type: actionTypes.DOC_CREATE_SUCCESS,
      doc: newDocument
    }];

    const store = mockStore({});

    return store.dispatch(actionCreators.createDoc(newDocument))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });

  it('simulates successful document edit', () => {
    let editDocument = documents[1].document2;

    mock
      .put(`/api/documents/${editDocument._id}`, () => {
        return {
          body: editDocument
        };
      });

    const expectedActions = [{
      type: actionTypes.DOC_UPDATE_REQUEST,
      updates: editDocument
    }, {
      type: actionTypes.DOC_UPDATE_SUCCESS,
      doc: editDocument
    }];

    const store = mockStore({});

    return store.dispatch(actionCreators.editDoc(editDocument))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });

  it('simulates successful document delete', () => {
    let deleteDocument = documents[1].document2;

    mock
      .del(`/api/documents/${deleteDocument._id}`, () => {
        return {
          body: deleteDocument
        };
      });

    const expectedActions = [{
      type: actionTypes.DOC_DELETE_REQUEST,
      doc: deleteDocument
    }, {
      type: actionTypes.DOC_DELETE_SUCCESS,
      doc: deleteDocument
    }];

    const store = mockStore({});

    return store.dispatch(actionCreators.deleteDoc(deleteDocument))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });
});
