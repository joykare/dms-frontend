import React from 'react';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import AuthWrapperContainer from '../../containers/Auth/AuthWrapperContainer';

const style = {
  marginTop: '10%'
};

const LandingPage = () => {
  return (
    <div>
      <AppBar
        showMenuIconButton={false}
        title='Doc~sy'
      />
      <div className='row' style={style}>
        <div className='col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4'>
          <Paper >
            <AuthWrapperContainer />
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
