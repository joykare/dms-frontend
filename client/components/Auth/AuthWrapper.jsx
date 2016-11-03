import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import LogInContainer from '../../containers/Auth/LogInContainer.jsx';
import SignUpContainer from '../../containers/Auth/SignUpContainer.jsx';

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
        <SignUpContainer />
      </Tab>
      <Tab label='Log In' value='login'>
        <LogInContainer />
      </Tab>
    </Tabs>
    </Paper>
  );
};

export default AuthWrapper;
