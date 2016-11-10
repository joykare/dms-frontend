import React, {PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const SignUp = (props) => {
  return (
    <form style={{textAlign:'center'}}>
      <div>
        <TextField
          hintText = "Username"
          floatingLabelText="Username"
          name='username'
          onBlur={props.validate}
          onChange={props.onChange}
        />
      </div>
      <div>
        <TextField
          hintText="Email"
          floatingLabelText="Email"
          name='email'
          onBlur={props.validate}
          onChange={props.onChange}
        />
      </div>
      <div>
        <TextField
          hintText="Password"
          floatingLabelText="Password"
          name='password'
          type='password'
          onBlur={props.validate}
          onChange={props.onChange}
        />
      </div>
      <div>
        <TextField
          hintText="Confirm Password"
          floatingLabelText="Confirm Password"
          name='confirmPassword'
          type='password'
          onBlur={props.validate}
          onChange={props.onChange}
        />
      </div>
      <br/><br/>
      <div>
        <RaisedButton label="Signup" primary={true} onClick={props.onSignup}/>
      </div>
    </form>
  );
};

SignUp.propTypes = {
  onSignup: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  reset: PropTypes.func,
  validate: PropTypes.func
};

export default SignUp;
