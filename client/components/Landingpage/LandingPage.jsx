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
  top: '60%',
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
      <div className='jumbotron col-sm-12 text-center' style={{backgroundColor: 'transparent', marginTop: 70}}>
        <h3>Document Management System</h3>
      </div>
      <div>
        <Paper style={style} zDepth={3}>
          <AuthWrapperContainer />
        </Paper>
      </div>

    </div>
  );
};

export default LandingPage;
