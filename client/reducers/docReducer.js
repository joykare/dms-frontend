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
    })
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
  case actionTypes.DOC_UPDATE_REQUEST:
    return (
      state.merge(Map({
        isFetching: true,
        document: Map({
          docContent: fromJS(action.updates)
        })
      }))
    );
  case actionTypes.DOC_UPDATE_SUCCESS:
    return (
      state.merge(Map({
        isFetching: false,

      }))
    );
  case actionTypes.DOC_CREATE_REQUEST:
    return (
      state.merge(Map({
        isFetching: true,
        document: Map({
          docContent: fromJS(action.doc)
        })
      }))
    );
  case actionTypes.DOC_CREATE_SUCCESS:
    return (
      state.merge(Map({
        isFetching: false,
        docList: state.get('docList').push(fromJS(action.doc))
      }))
    );
  default:
    return state;
  }
}
