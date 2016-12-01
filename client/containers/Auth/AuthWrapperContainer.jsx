import React, {PropTypes} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import LogIn from '../../components/Auth/LogIn';
import SignUp from '../../components/Auth/SignUp';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from '../../actions/authActions';
import * as validate from '../../utils/fieldValidation';
import isEmpty from 'lodash/isEmpty';

class AuthWrapperContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLoginValidate =this.handleLoginValidate.bind(this);
    this.handleSignupValidate =this.handleSignupValidate.bind(this);
    this.handleSignup =this.handleSignup.bind(this);
    this.handleLogin =this.handleLogin.bind(this);
  }

  handleLoginValidate() {
    let errors = validate.validateLogIn(this.props.auth.get('credentials').toJS());

    if(!isEmpty(errors)) {
      this.props.authActions.validationFailure(errors);
    } else {
      this.props.authActions.validationSuccess();
    }
  }

  handleSignupValidate() {
    let errors = validate.validateSignUp(this.props.auth.get('credentials').toJS());

    if(!isEmpty(errors)) {
      this.props.authActions.validationFailure(errors);
    } else {
      this.props.authActions.validationSuccess();
    }
  }

  handleChange(event) {
    event.preventDefault();
    let credentials = this.props.auth.get('credentials');
    credentials = credentials.set(event.target.name, event.target.value);
    this.props.authActions.updateCredentials(credentials.toJS());
  }

  handleLogin() {
    this.props.authActions.loginUser(this.props.auth.get('credentials').toJS()).then(
      () => {
        if(this.props.auth.get('isAuthenticated')){
          this.context.router.push('/home');
        }
      }
    );
  }

  handleSignup() {
    this.props.authActions.signupUser(this.props.auth.get('credentials').toJS()).then(
      () => {
        if(this.props.auth.get('isAuthenticated')){
          this.context.router.push('/home');
        }
      }
    );
  }

  render() {
    return (
      <Tabs>
        <Tab label='Sign Up' value='signup'>
          <SignUp auth={this.props.auth.toJS()}
                  onChange={this.handleChange}
                  onBlur={this.handleSignupValidate}
                  onSignup={this.handleSignup} />
        </Tab>

        <Tab label='Log In' value='login'>
          <LogIn auth={this.props.auth.toJS()}
                  onChange={this.handleChange}
                  onBlur={this.handleLoginValidate}
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

AuthWrapperContainer.contextTypes = {
  router: PropTypes.object
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
