import React from 'react';
import AppBar from 'material-ui/AppBar';
import AuthWrapper from '../Auth/AuthWrapper';

const LandingPage = () => {
  return (
    <div>
      <AppBar
        showMenuIconButton={false}
      />
      <div className='jumbotron col-sm-12 text-center' style={{backgroundColor: 'transparent'}}>
        <h1>Doc~sy</h1>
        <h3>Document Management System</h3>
        <h3>Start now :) </h3>
      </div>
      <div>
        <AuthWrapper />
      </div>

    </div>
  );
};

export default LandingPage;
