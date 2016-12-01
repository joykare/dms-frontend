import React from 'react';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import AuthWrapperContainer from '../../containers/Auth/AuthWrapperContainer';

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

const LandingPage = () => {
  return (
    <div>
      <AppBar
        showMenuIconButton={false}
        title='Doc~sy'
      />
      <div>
        <Paper style={style} zDepth={3}>
          <AuthWrapperContainer />
        </Paper>
      </div>
    </div>
  );
};

export default LandingPage;
