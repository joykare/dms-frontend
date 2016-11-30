import docReducer, {INITIAL_DOC_STATE} from '../../../client/reducers/docReducer';
import * as docActions from '../../../client/constants';
import {expect} from 'chai';
import {Map, fromJS} from 'immutable';

describe('docReducer spec', () => {
  it('returns initial state', () => {
    expect(docReducer(undefined, {})).to.eql(INITIAL_DOC_STATE);
  });

  it('handles DOC_GET_REQUEST', () => {
    const action = {
      type: docActions.DOC_GET_REQUEST
    };

    expect(docReducer(Map(), action)).to.eql(Map({
      isFetching: true,
      document: INITIAL_DOC_STATE.getIn(['document']),
      snackBarState: INITIAL_DOC_STATE.getIn(['snackBarState']),
      error: null
    }));
  });

  it('handles DOC_GET_SUCCESS', () => {
    const action = {
      type: docActions.DOC_GET_SUCCESS,
      doc: {
        title: 'Test',
        content: 'test'
      },
    };

    expect(docReducer(Map(), action)).to.eql(Map({
      isFetching: false,
      docList: fromJS(action.doc),
      document: INITIAL_DOC_STATE.getIn(['document']),
      snackBarState: INITIAL_DOC_STATE.getIn(['snackBarState']),
      error: null
    }));
  });

  it('handles DOC_GET_FAILURE', () => {
    const action = {
      type: docActions.DOC_GET_FAILURE,
      error: {
        message: 'Oopsy'
      }
    };

    expect(docReducer(Map(), action)).to.eql(Map({
      isFetching: false,
      document: INITIAL_DOC_STATE.getIn(['document']),
      snackBarState: Map({
        open: true,
        message: 'Error occured. Please try again'
      }),
      error: fromJS(action.error)
    }));
  });

  it('handles DOC_CREATE_REQUEST', () => {
    const action = {
      type: docActions.DOC_CREATE_REQUEST,
      doc: {
        title: 'Test 2',
        content: 'Blah'
      }
    };

    expect(docReducer(Map(), action)).to.eql(Map({
      isFetching: true,
      document: Map({
        docContent: fromJS(action.doc),
        isUpdatingDoc: false,
        isShowingDialog: true,
        confirmDelete: false
      }),
      snackBarState: INITIAL_DOC_STATE.getIn(['snackBarState']),
      error: null
    }));
  });

  it('handles DOC_CREATE_SUCCESS', () => {
    const state = Map({
      docList: fromJS([{
        title: 'What'
      }])
    });

    const action = {
      type: docActions.DOC_CREATE_SUCCESS,
      doc: {
        title: 'Test',
        content: 'test'
      },
    };

    expect(docReducer(state, action)).to.eql(Map({
      isFetching: false,
      docList: state.get('docList').unshift(fromJS(action.doc)),
      document: INITIAL_DOC_STATE.getIn(['document']),
      snackBarState: Map({
        open: true,
        message: 'Document has been successfully created'
      }),
      error: null
    }));
  });

  it('handles DOC_CREATE_FAILURE', () => {
    const action = {
      type: docActions.DOC_CREATE_FAILURE,
      error: {
        message: 'Oopsy'
      }
    };

    expect(docReducer(Map(), action)).to.eql(Map({
      isFetching: false,
      document: INITIAL_DOC_STATE.getIn(['document']),
      snackBarState: Map({
        open: true,
        message: 'Error occured. Please try again'
      }),
      error: fromJS(action.error)
    }));
  });

  it('handles DOC_UPDATE_REQUEST', () => {
    const action = {
      type: docActions.DOC_UPDATE_REQUEST,
      updates: {
        title: 'Test 3',
        content: 'Blah'
      }
    };

    expect(docReducer(Map(), action)).to.eql(Map({
      isFetching: true,
      document: Map({
        docContent: fromJS(action.updates),
        isShowingDialog: true,
        isUpdatingDoc: true,
        confirmDelete: false
      }),
      snackBarState: INITIAL_DOC_STATE.getIn(['snackBarState']),
      error: null
    }));
  });

  it('handles DOC_UPDATE_SUCCESS', () => {
    const action = {
      type: docActions.DOC_UPDATE_SUCCESS,
      doc: {
        title: 'Test 3',
        content: 'blah'
      },
    };

    expect(docReducer(Map(), action)).to.eql(Map({
      isFetching: false,
      document: INITIAL_DOC_STATE.getIn(['document']),
      snackBarState: Map({
        open: true,
        message: 'Document has been successfully edited'
      }),
      error: null
    }));
  });

  it('handles DOC_UPDATE_FAILURE', () => {
    const action = {
      type: docActions.DOC_UPDATE_FAILURE,
      error: {
        message: 'Oopsy'
      }
    };

    expect(docReducer(Map(), action)).to.eql(Map({
      isFetching: false,
      document: INITIAL_DOC_STATE.getIn(['document']),
      snackBarState: Map({
        open: true,
        message: 'Error occured. Please try again'
      }),
      error: fromJS(action.error)
    }));
  });

  it('handles DOC_DELETE_REQUEST', () => {
    const action = {
      type: docActions.DOC_DELETE_REQUEST,
      doc: {
        title: 'Test 3',
        content: 'Blah'
      }
    };

    expect(docReducer(Map(), action)).to.eql(Map({
      isFetching: true,
      document: Map({
        docContent: fromJS(action.doc),
        isShowingDialog: false,
        isUpdatingDoc: false,
        confirmDelete: false
      }),
      snackBarState: INITIAL_DOC_STATE.getIn(['snackBarState']),
      error: null
    }));
  });

  it('handles DOC_DELETE_SUCCESS', () => {
    const action = {
      type: docActions.DOC_DELETE_SUCCESS,
      doc: {
        title: 'Test 3',
        content: 'Blah'
      }
    };

    expect(docReducer(Map(), action)).to.eql(Map({
      isFetching: false,
      document: INITIAL_DOC_STATE.getIn(['document']),
      snackBarState: Map({
        open: true,
        message: 'Document has been successfully deleted'
      }),
      error: null
    }));
  });

  it('handles DOC_DELETE_FAILURE', () => {
    const action = {
      type: docActions.DOC_DELETE_FAILURE,
      error: {
        message: 'Oopsy'
      }
    };

    expect(docReducer(Map(), action)).to.eql(Map({
      isFetching: false,
      document: INITIAL_DOC_STATE.getIn(['document']),
      snackBarState: Map({
        open: true,
        message: 'Error occured. Please try again'
      }),
      error: fromJS(action.error)
    }));
  });

  it('handles TOGGLE_CREATE_DOC', () => {
    const action = {
      type: docActions.TOGGLE_CREATE_DOC
    };

    expect(docReducer(Map(), action)).to.eql(Map({
      isFetching: false,
      document: Map({
        docContent: INITIAL_DOC_STATE.getIn(['document', 'docContent']),
        isUpdatingDoc: false,
        isShowingDialog: true,
        confirmDelete: false
      }),
      snackBarState: INITIAL_DOC_STATE.getIn(['snackBarState']),
      error: null
    }));
  });

  it('handles TOGGLE_UPDATE_DOC', () => {
    const state = Map({
      document: Map({
        docContent: Map({
          title: '',
          content: ''
        })
      })
    });

    const action = {
      type: docActions.TOGGLE_UPDATE_DOC,
      doc: {
        title: 'Lol'
      }
    };

    expect(docReducer(state, action)).to.eql(Map({
      isFetching: false,
      document: Map({
        docContent: state.getIn(['document', 'docContent']).merge(fromJS(action.doc)),
        isUpdatingDoc: true,
        isShowingDialog: true,
        confirmDelete: false
      }),
      snackBarState: INITIAL_DOC_STATE.getIn(['snackBarState']),
      error: null
    }));
  });

  it('handles TOGGLE_DELETE_DOC', () => {
    const state = Map({
      document: Map({
        docContent: Map({
          title: '',
          content: ''
        })
      })
    });

    const action = {
      type: docActions.TOGGLE_DELETE_DOC,
      doc: {
        title: 'Lol'
      }
    };

    expect(docReducer(state, action)).to.eql(Map({
      isFetching: false,
      document: Map({
        docContent: state.get('document').get('docContent').merge(fromJS(action.doc)),
        isShowingDialog: false,
        isUpdatingDoc: false,
        confirmDelete: true
      }),
      snackBarState: INITIAL_DOC_STATE.getIn(['snackBarState']),
      error: null
    }));
  });

  it('handles TOGGLE_CLOSE', () => {
    const action = {
      type: docActions.TOGGLE_CLOSE
    };

    expect(docReducer(Map(), action)).to.eql(Map({
      isFetching: false,
      document: INITIAL_DOC_STATE.getIn(['document']),
      snackBarState: INITIAL_DOC_STATE.getIn(['snackBarState']),
      error: null
    }));
  });
});
