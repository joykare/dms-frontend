import {Map, List, fromJS} from 'immutable';
import * as actionTypes from '../constants';

export const INITIAL_DOC_STATE = Map({
  docList: List(),
  isFetching: false,
  document: Map({
    docContent: Map({
      title: '',
      accessLevel: '',
      content: '',
      role: ''
    }),
    isUpdatingDoc: false,
    isShowingDialog: false,
    confirmDelete: false
  })
});

export default function(state = INITIAL_DOC_STATE, action) {
  switch(action.type) {
  case actionTypes.DOC_GET_REQUEST:
    return (
      state.merge(Map({
        isFetching: true
      }))
    );
  case actionTypes.DOC_GET_SUCCESS:
    return (
      state.merge(Map({
        isFetching: false,
        docList: fromJS(action.doc)
      }))
    );
  case actionTypes.TOGGLE_CREATE_DOC:
    return (
      state.merge(Map({
        document: Map({
          docContent: Map({
            title: '',
            accessLevel: '',
            content: '',
            role: ''
          }),
          isUpdatingDoc: false,
          isShowingDialog: true,
          confirmDelete: false
        })
      }))
    );
  case actionTypes.TOGGLE_CLOSE:
    return (
      state.merge(Map({
        document: Map({
          docContent: Map({
            title: '',
            accessLevel: '',
            content: '',
            role: ''
          }),
          isUpdatingDoc: false,
          isShowingDialog: false,
          confirmDelete: false
        })
      }))
    );
  case actionTypes.TOGGLE_UPDATE_DOC:
    return (
      state.merge(Map({
        document: Map({
          docContent: state.get('document').get('docContent').merge(fromJS(action.doc)),
          isUpdatingDoc: true,
          isShowingDialog: true,
          confirmDelete: false
        })
      }))
    );
  case actionTypes.TOGGLE_DELETE_DOC:
    return (
      state.merge(Map({
        document: Map({
          docContent: state.get('document').get('docContent').merge(fromJS(action.doc)),
          isShowingDialog: false,
          isUpdatingDoc: false,
          confirmDelete: true
        })
      }))
    );
  case actionTypes.DOC_UPDATE_REQUEST:
    return (
      state.merge(Map({
        isFetching: true,
        document: Map({
          docContent: fromJS(action.updates),
          isShowingDialog: true,
          isUpdatingDoc: true,
          confirmDelete: false
        })
      }))
    );
  case actionTypes.DOC_UPDATE_SUCCESS:
    return (
      state.merge(Map({
        isFetching: false,
        document: Map({
          docContent: Map({
            title: '',
            accessLevel: '',
            content: '',
            role: ''
          }),
          isUpdatingDoc: false,
          isShowingDialog: false,
          confirmDelete: false
        })

      }))
    );
  case actionTypes.DOC_DELETE_REQUEST:
    return (
      state.merge(Map({
        isFetching: true,
        document: Map({
          docContent: fromJS(action.doc),
          isShowingDialog: false,
          isUpdatingDoc: false,
          confirmDelete: false
        })
      }))
    );
  case actionTypes.DOC_DELETE_SUCCESS:
    return (
      state.merge(Map({
        isFetching: false,
        document: Map({
          docContent: Map({
            title: '',
            accessLevel: '',
            content: '',
            role: ''
          }),
          isUpdatingDoc: false,
          isShowingDialog: false,
          confirmDelete: false
        })

      }))
    );
  case actionTypes.DOC_CREATE_REQUEST:
    return (
      state.merge(Map({
        isFetching: true,
        document: Map({
          docContent: fromJS(action.doc),
          isUpdatingDoc: false,
          isShowingDialog: true,
          confirmDelete: false
        })
      }))
    );
  case actionTypes.DOC_CREATE_SUCCESS:
    return (
      state.merge(Map({
        isFetching: false,
        docList: state.get('docList').push(fromJS(action.doc)),
        document: Map({
          docContent: Map({
            title: '',
            accessLevel: '',
            content: '',
            role: ''
          }),
          isUpdatingDoc: false,
          isShowingDialog: false,
          confirmDelete: false
        })
      }))
    );
  default:
    return state;
  }
}
