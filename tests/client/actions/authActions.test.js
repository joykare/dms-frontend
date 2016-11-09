import request from 'superagent';
import mocker from 'superagent-mocker';
import thunk from 'redux-thunk';
import {expect} from 'chai';
import configureStore from 'redux-mock-store';

import * as actionCreators from '../../../client/actions/authActions';
import * as actionTypes from '../../../client/constants';

const mock = mocker(request);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('async authentication actions', () => {
  const credentials = {
    email: 'user@gmail.com',
    password: 'user'
  };

  const user = {
    token: 'token',
    user: 'user'
  };

  beforeEach(function(){
    mock.clearRoutes();
  });

  it('simulates successful login', () => {
    mock
      .post('/api/users/login', () => {
        return {
          body: user
        };
      });

    const expectedActions = [{
      type: actionTypes.LOGIN_REQUEST,
      credentials
    }, {
      type: actionTypes.LOGIN_SUCCESS,
      user
    }];

    const store = mockStore({});

    return store.dispatch(actionCreators.loginUser(credentials))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });

  it('simulates successful signup', () => {
    mock
      .post('/api/users', () => {
        return {
          body: user
        };
      });

    const expectedActions = [{
      type: actionTypes.SIGNUP_REQUEST,
      credentials
    }, {
      type: actionTypes.SIGNUP_SUCCESS,
      user
    }];

    const store = mockStore({});

    return store.dispatch(actionCreators.signupUser(credentials))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });

  it('simulates failed login', () => {
    mock
      .post('/api/users/login', () => {
        return {
          status: 401,
          body: {error: 'Ooopsy'}
        };
      });

    const expectedActions = [{
      type: actionTypes.LOGIN_REQUEST,
      credentials
    }, {
      type: actionTypes.LOGIN_FAILURE,
      error: {error: 'Ooopsy'}
    }];

    const store = mockStore({});

    return store.dispatch(actionCreators.loginUser(credentials))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });

  it('simulates failed signup', () => {
    mock
      .post('/api/users', () => {
        return {
          status: 500,
          body: {error: 'Ooopsy'}
        };
      });

    const expectedActions = [{
      type: actionTypes.SIGNUP_REQUEST,
      credentials
    }, {
      type: actionTypes.SIGNUP_FAILURE,
      error: {error: 'Ooopsy'}
    }];

    const store = mockStore({});

    return store.dispatch(actionCreators.signupUser(credentials))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });
});
