import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Main from '../components/Main/Main.jsx';
import AuthWrapper from '../components/Auth/AuthWrapper.jsx';

const routes = (
  <Router history={hashHistory}>
    <Route path='/' components={Main}>
      <IndexRoute components={AuthWrapper} />
    </Route>
  </Router>
);

export default routes;
