import React, {PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ValidationError from './Validation';

const LogIn = (props) => {
  return (
    <form style={{textAlign:'center', marginTop:80}}>
      {!!props.auth.error && <p className='isa_error' style={{color: '#D8000C', backgroundColor: '#FFBABA', padding: 12, margin: 10}}> {props.auth.error.message} </p>}
      <div>
        <TextField
          className='email'
          name='email'
          hintText='Email'
          floatingLabelText='Email'
          onChange={props.onChange}
          onBlur={props.onBlur}
        /><br/>
        {!!props.auth.validations.errorMessage && <ValidationError error={props.auth.validations.errorMessage.email}/>}
      </div>
      <div>
        <TextField
          className='password'
          name='password'
          hintText='Password'
          floatingLabelText='Password'
          type='password'
          onChange={props.onChange}
          onBlur={props.onBlur}
        /><br/>
        {!!props.auth.validations.errorMessage && <ValidationError error={props.auth.validations.errorMessage.password}/>}
      </div>
      <br/><br/>
      <div>
        <RaisedButton className='loginButton' disabled={!props.auth.validations.isValid} label='Login' primary={true} onClick={props.onLogin}/>
      </div>
    </form>
  );
};

LogIn.propTypes = {
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
  onLogin: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

export default LogIn;
