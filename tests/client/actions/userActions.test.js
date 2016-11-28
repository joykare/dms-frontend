import request from 'superagent';
import mocker from 'superagent-mocker';
import thunk from 'redux-thunk';
import {expect} from 'chai';
import configureStore from 'redux-mock-store';

import * as actionCreators from '../../../client/actions/userActions';
import * as actionTypes from '../../../client/constants';

const mock = mocker(request);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('async user actions', () => {
  const users = [
    {
      _id: '1',
      username: 'user',
      email: 'user@gmail.com',
      role: 'user'
    }, {
      _id: '2',
      username: 'admin',
      email: 'admin@gmail.com',
      role: 'admin'
    }
  ];

  const documents = [
    {
      _id: '1',
      title: 'Hey',
      content: 'Test'
    },
    {
      _id: '2',
      title: 'Hallo',
      content: 'Test2'
    }
  ];

  beforeEach(() => {
    mock.clearRoutes();
  });

  it('simulates successful user fetch', () => {
    mock
      .get('/api/users', () => {
        return {
          body: users
        };
      });

    const expectedActions = [{
      type: actionTypes.USER_GET_REQUEST
    }, {
      type: actionTypes.USER_GET_SUCCESS,
      users
    }];

    const store = mockStore({});

    return store.dispatch(actionCreators.fetchAllUsers())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });

  it('simulates successful user edit', () => {
    const editedUser = users[0];
    mock
      .put('/api/users/1', () => {
        return {
          body: editedUser
        };
      });

    const expectedActions = [{
      type: actionTypes.USER_DETAILS_REQUEST
    }, {
      type: actionTypes.USER_DETAILS_SUCCESS,
      user: editedUser
    }];

    const store = mockStore({});

    return store.dispatch(actionCreators.editUser(editedUser))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });

  it('simulates successful user document fetch', () => {
    const user = users[0];
    mock
      .get('/api/users/1/documents', () => {
        return {
          body: documents
        };
      });

    const expectedActions = [{
      type: actionTypes.USER_DOC_REQUEST,
      user
    }, {
      type: actionTypes.USER_DOC_SUCCESS,
      documents
    }];

    const store = mockStore({});

    return store.dispatch(actionCreators.fetchUserDocuments(user))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });
});
