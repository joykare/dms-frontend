import {Map, List, fromJS} from 'immutable';
import * as actionTypes from '../constants';

export const INITIAL_DOC_STATE = Map({
  doc_list: List(),
  isFetching: false,
  document: Map({
    doc_content: Map({
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
        doc_list: fromJS(action.doc)
      }))
    );
  case actionTypes.DOC_UPDATE_REQUEST:
    return (
      state.merge(Map({
        isFetching: true,
        document: Map({
          doc_content: fromJS(action.updates)
        })
      }))
    );
  case actionTypes.DOC_UPDATE_SUCCESS:
    return (
      state.merge(Map({
        isFetching: false,

      }))
    );
  default:
    return state;
  }
}
