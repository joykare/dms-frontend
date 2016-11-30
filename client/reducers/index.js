import { combineReducers } from 'redux';
import auth from './authReducers';
import user from './userReducer';
import documents from './docReducer';
import roles from './roleReducer';

const rootReducer = combineReducers({
  auth,
  user,
  documents,
  roles
});

export default rootReducer;
