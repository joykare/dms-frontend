import React, {PropTypes} from 'react';
import TextField from 'material-ui/TextField';

const SignUp = (props) => {
  return (
    <form style={{textAlign:'center'}}>
      <div>
        <TextField hintText = "First Name"
          floatingLabelText="First Name"
          name='first'
          onBlur={props.validate}
          onChange={props.onChange}
        />
      </div>
      <div>
        <TextField
          hintText = "Last Name"
          floatingLabelText="Last Name"
          name='last'
          onBlur={props.validate}
          onChange={props.onChange}
        />
      </div>
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
        <button type="button" onClick={props.onSignup}>Submit</button>
        <button type="button" disabled={props.pristine || props.submitting} onClick={props.reset}>Clear Values
        </button>
      </div>
    </form>
  );
};

SignUp.propTypes = {
  onSignup: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  pristine: PropTypes.func,
  submitting: PropTypes.func,
  reset: PropTypes.func,
  validate: PropTypes.func
};

export default SignUp;
