import userReducer, {INITIAL_USER_STATE} from '../../../client/reducers/userReducer';
import * as userActions from '../../../client/constants';
import {expect} from 'chai';
import {Map, fromJS} from 'immutable';

describe('userReducer spec', () => {
  it('returns initial state', () => {
    expect(userReducer(undefined, {})).to.eql(INITIAL_USER_STATE);
  });

  it('handles USER_GET_REQUEST', () => {
    const action = {
      type: userActions.USER_GET_REQUEST
    };

    expect(userReducer(Map(), action)).to.eql(Map({
      isFetching: true,
      userDetails: INITIAL_USER_STATE.getIn(['userDetails']),
      isEditing: false,
      error: null
    }));
  });

  it('handles USER_GET_SUCCESS', () => {
    const action = {
      type: userActions.USER_GET_SUCCESS,
      users: [{
        _id: '1',
        username: 'username1'
      }, {
        _id: '2',
        username: 'username2'
      }]
    };

    expect(userReducer(Map(), action)).to.eql(Map({
      isFetching: false,
      userDetails: INITIAL_USER_STATE.getIn(['userDetails']),
      users: fromJS(action.users),
      isEditing: false,
      error: null
    }));
  });

  it('handles USER_GET_FAILURE', () => {
    const action = {
      type: userActions.USER_GET_FAILURE,
      error: {
        message: 'None Found'
      }
    };

    expect(userReducer(Map(), action)).to.eql(Map({
      isFetching: false,
      error: fromJS(action.error)
    }));
  });

  it('handles USER_DETAILS_REQUEST', () => {
    const action = {
      type: userActions.USER_DETAILS_REQUEST
    };

    expect(userReducer(Map(), action)).to.eql(Map({
      isFetching: true,
      isEditing: true,
      error: null
    }));
  });

  it('handles USER_DETAILS_SUCCESS', () => {
    const action = {
      type: userActions.USER_DETAILS_SUCCESS,
      user: {
        _id: '1',
        username: 'username1'
      }
    };

    expect(userReducer(Map(), action)).to.eql(Map({
      isFetching: false,
      userDetails: fromJS(action.user),
      isEditing: false,
      error: null
    }));
  });

  it('handles USER_DETAILS_FAILURE', () => {
    const action = {
      type: userActions.USER_DETAILS_FAILURE,
      error: {
        message: 'User not Found'
      }
    };

    expect(userReducer(Map(), action)).to.eql(Map({
      isFetching: false,
      error: fromJS(action.error)
    }));
  });

  it('handles USER_DOC_REQUEST', () => {
    const action = {
      type: userActions.USER_DOC_REQUEST,
      user: {
        _id: '1',
        username: 'username'
      }
    };

    expect(userReducer(Map(), action)).to.eql(Map({
      isFetching: true,
      userDetails: fromJS(action.user),
      isEditing: false,
      error: null
    }));
  });

  it('handles USER_DOC_SUCCESS', () => {
    const action = {
      type: userActions.USER_DOC_SUCCESS,
      documents: {
        _id: '1',
        title: 'doc1'
      }
    };

    expect(userReducer(Map(), action)).to.eql(Map({
      isFetching: false,
      documents: fromJS(action.documents),
      isEditing: false,
      error: null
    }));
  });

  it('handles USER_DOC_FAILURE', () => {
    const action = {
      type: userActions.USER_DOC_FAILURE,
      error: {
        message: 'User has no Documents'
      }
    };

    expect(userReducer(Map(), action)).to.eql(Map({
      isFetching: false,
      error: fromJS(action.error)
    }));
  });

  it('handles USER_UPDATE_REQUEST', () => {
    const action = {
      type: userActions.USER_UPDATE_REQUEST,
      updates: {
        username: 'real',
        email: 'real@gmail.com'
      }
    };

    expect(userReducer(Map(), action)).to.eql(Map({
      isFetching: true,
      isEditing: true,
      userDetails: fromJS(action.updates),
      error: null
    }));
  });

  it('handles USER_CLOSE_TOGGLE', () => {
    const action = {
      type: userActions.USER_CLOSE_TOGGLE,
    };

    expect(userReducer(Map(), action)).to.eql(Map({
      isEditing: false
    }));
  });

  it('handles USER_EDIT_TOGGLE', () => {
    const action = {
      type: userActions.USER_EDIT_TOGGLE,
    };

    expect(userReducer(Map(), action)).to.eql(Map({
      isEditing: true
    }));
  });

});
