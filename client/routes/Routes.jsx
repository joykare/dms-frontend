import React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import {Provider} from 'react-redux';
import Main from '../components/Main/Main';
import AuthWrapper from '../components/Auth/AuthWrapper';
import DashBoard from '../components/Dashboard/DashBoard';
import LandingPage from '../components/Landingpage/LandingPage';
import configureStore from '../store/store';
require('babel-polyfill');

const store = configureStore();

const routes = (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' components={Main}>
        <IndexRoute components={LandingPage} />
      <Route path='/home' components={DashBoard} />
      <Route path='/trial' components={AuthWrapper} />
      </Route>
    </Router>
  </Provider>
);

export default routes;
