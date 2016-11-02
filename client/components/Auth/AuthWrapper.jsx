import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import LogIn from './LogIn.jsx';
import SignUp from './SignUp.jsx';

const style = {
  height: 500,
  width: 500,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginRight: '-50%',
  transform: 'translate(' + '-50%,' + '-50%' + ')'
};

const AuthWrapper = () => {
  return (
    <Paper style={style} zDepth={3}>
    <Tabs>
      <Tab label='Sign Up' value='signup'>
        <SignUp />
      </Tab>
      <Tab label='Log In' value='login'>
        <LogIn />
      </Tab>
    </Tabs>
    </Paper>
  );
};

export default AuthWrapper;
