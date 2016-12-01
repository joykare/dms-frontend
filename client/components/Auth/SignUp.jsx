import React, {PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ValidationError from './Validation';

const SignUp = (props) => {
  return (
    <form style={{textAlign:'center', marginTop:10}}>
      <div>
          {!!props.auth.error && <p className='isa_error' style={{color: '#D8000C', backgroundColor: '#FFBABA', padding: 12, margin: 10}}> {props.auth.error.message} </p>}
        <TextField
          className='username'
          hintText='Username'
          floatingLabelText='Username'
          name='username'
          onBlur={props.onBlur}
          onChange={props.onChange}
        /><br/>
        {!!props.auth.validations.errorMessage && <ValidationError error={props.auth.validations.errorMessage.username}/>}
      </div>
      <div>
        <TextField
          className='email'
          hintText='Email'
          floatingLabelText='Email'
          name='email'
          onBlur={props.onBlur}
          onChange={props.onChange}
        /><br/>
        {!!props.auth.validations.errorMessage && <ValidationError error={props.auth.validations.errorMessage.email}/>}
      </div>
      <div>
        <TextField
          className='password'
          hintText='Password'
          floatingLabelText='Password'
          name='password'
          type='password'
          onBlur={props.onBlur}
          onChange={props.onChange}
        /><br/>
        {!!props.auth.validations.errorMessage && <ValidationError error={props.auth.validations.errorMessage.password}/>}
      </div>
      <div>
        <TextField
          className='confirmPassword'
          hintText='Confirm Password'
          floatingLabelText='Confirm Password'
          name='confirmPassword'
          type='password'
          onBlur={props.onBlur}
          onChange={props.onChange}
        /><br/>
        {!!props.auth.validations.errorMessage && <ValidationError error={props.auth.validations.errorMessage.confirmPassword}/>}
      </div>
      <br/>
      <div>
        <RaisedButton className='signupButton' disabled={!props.auth.validations.isValid} label='Signup' primary={true} onClick={props.onSignup}/>
      </div>
      <br/><br/>
    </form>
  );
};

SignUp.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    credentials: PropTypes.object.isRequired,
    validations: PropTypes.shape({
      isValid: PropTypes.bool.isRequired,
      errorMessage: PropTypes.object
    }),
    error: PropTypes.object
  }).isRequired,
  onSignup: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

export default SignUp;
