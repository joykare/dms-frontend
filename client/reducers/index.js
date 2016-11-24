import { combineReducers } from 'redux';
import auth from './authReducers';
import user from './userReducer';
import documents from './docReducer';

const rootReducer = combineReducers({
  auth,
  user,
  documents
});

export default rootReducer;
