import React, {PropTypes} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import LogIn from '../../components/Auth/LogIn';
import SignUp from '../../components/Auth/SignUp';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from '../../actions/authActions';

class AuthWrapperContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange =this.handleChange.bind(this);
    this.handleValidate =this.handleValidate.bind(this);
    this.handleSignup =this.handleSignup.bind(this);
    this.handleLogin =this.handleLogin.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleValidate() {

  }

  handleReset() {
  }

  handleChange(event) {
    let credentials = this.props.auth.get('credentials');
    credentials = credentials.set(event.target.name, event.target.value);
    this.props.authActions.updateCredentials(credentials.toJS());
  }

  handleLogin() {
    this.props.authActions.loginUser(this.props.auth.get('credentials').toJS());
  }

  handleSignup() {
    this.props.authActions.signupUser(this.props.auth.get('credentials').toJS());
  }

  render() {
    return (
      <Tabs>
        <Tab label='Sign Up' value='signup'>
          <SignUp onChange={this.handleChange}
                  validate={this.handleValidate}
                  onReset={this.handleReset}
                  onSignup={this.handleSignup} />
        </Tab>
        <Tab label='Log In' value='login'>
          <LogIn onChange={this.handleChange}
                  onReset={this.handleReset}
                  onLogin={this.handleLogin} />
        </Tab>
      </Tabs>
    );
  }
}
AuthWrapperContainer.propTypes = {
  auth: PropTypes.object,
  authActions: PropTypes.object
};

function mapStateToProps(state){
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch){
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthWrapperContainer);
