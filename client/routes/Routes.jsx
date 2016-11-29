import React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import {Provider} from 'react-redux';
import Main from '../components/Main/Main';
import DashBoard from '../components/Dashboard/DashBoard';
import ProfilePage from '../containers/User/ProfilePageContainer';
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
      <Route path='/profile/:_id' components={ProfilePage} />
      </Route>
    </Router>
  </Provider>
);

export default routes;
