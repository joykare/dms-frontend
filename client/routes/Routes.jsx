import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import Main from '../components/Main/Main';
import AuthWrapper from '../components/Auth/AuthWrapper';
import configureStore from '../store/store';

const store = configureStore();

const routes = (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' components={Main}>
        <IndexRoute components={AuthWrapper} />
      </Route>
    </Router>
  </Provider>
);

export default routes;
