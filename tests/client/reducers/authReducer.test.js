import authReducer, {INITIAL_STATE} from '../../../client/reducers/authReducers';
import * as authActions from '../../../client/constants';
import {expect} from 'chai';
import {Map, fromJS} from 'immutable';

describe('authReducer spec', () => {
  it('returns the initial state', () => {
    expect(authReducer(undefined, {})).to.eql(INITIAL_STATE);
  });

  it('handles LOGIN_REQUEST', () => {
    const action = {
      type: authActions.LOGIN_REQUEST,
      credentials: {
        email: 'test@gmail.com',
        password: 'test'
      }
    };
    expect(authReducer(Map(), action)).to.eql(Map({
      isAuthenticated: false,
      isFetching: true,
      credentials: fromJS(action.credentials)
    }));
  });

  it('handles SIGNUP_REQUEST', () => {
    const action = {
      type: authActions.SIGNUP_REQUEST,
      credentials: {
        email: 'test@gmail.com',
        password: 'test'
      }
    };
    expect(authReducer(Map(), action)).to.eql(Map({
      isAuthenticated: false,
      isFetching: true,
      credentials: fromJS(action.credentials)
    }));
  });

  it('handles LOGIN_SUCCESS', () => {
    const action = {
      type: authActions.LOGIN_SUCCESS,
      user: {
        email: 'test@gmail.com',
        role: 'user'
      }
    };
    expect(authReducer(Map(), action)).to.eql(Map({
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
    }));
  });

  it('handles SIGNUP_SUCCESS', () => {
    const action = {
      type: authActions.SIGNUP_SUCCESS,
      user: {
        email: 'test@gmail.com',
        role: 'user'
      }
    };
    expect(authReducer(Map(), action)).to.eql(Map({
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
    }));
  });

  it('handles LOGIN_FAILURE', () => {
    const action = {
      type: authActions.LOGIN_FAILURE,
      error: {error:'Ooopsy'}
    };
    expect(authReducer(Map(), action)).to.eql(Map({
      isAuthenticated: false,
      isFetching: false,
      user: null,
      error: fromJS(action.error)
    }));
  });

  it('handles SIGNUP_FAILURE', () => {
    const action = {
      type: authActions.SIGNUP_FAILURE,
      error: {error:'Ooopsy'}
    };
    expect(authReducer(Map(), action)).to.eql(Map({
      isAuthenticated: false,
      isFetching: false,
      user: null,
      error: fromJS(action.error)
    }));
  });

  it('handles UPDATE_CREDENTIALS', () => {
    const action = {
      type: authActions.UPDATE_CREDENTIALS,
      credentials: {
        email: 'test'
      }
    };
    expect(authReducer(Map(), action)).to.eql(Map({
      credentials: fromJS(action.credentials)
    }));
  });
});
