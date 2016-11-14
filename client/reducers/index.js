import { combineReducers } from 'redux';
import auth from './authReducers';
import documents from './docReducer';

const rootReducer = combineReducers({
  auth,
  documents
});

export default rootReducer;
