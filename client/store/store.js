import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
// import createLogger from 'redux-logger';

// const logger = createLogger();

const configureStore = () => {
  return createStore(
    rootReducer,
    compose(
      applyMiddleware(
        thunk
        // logger
      ),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    );
};

export default configureStore;
