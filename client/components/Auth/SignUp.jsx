import React, {PropTypes} from 'react';
import TextField from 'material-ui/TextField';

const SignUp = (props) => {
  return (
    <form onSubmit={props.onSubmit} style={{textAlign:'center'}}>
      <div>
        <TextField hintText = "First Name"
          floatingLabelText="First Name"
          onChange={props.validate}
        />
      </div>
      <div>
        <TextField
          hintText = "Last Name"
          floatingLabelText="Last Name"
          onChange={props.validate}
        />
      </div>
      <div>
        <TextField
          hintText="Email"
          floatingLabelText="Email"
          onChange={props.validate}
        />
      </div>
      <div>
        <TextField
          hintText="Password"
          floatingLabelText="Password"
          type='password'
          onChange={props.validate}
        />
      </div>
      <div>
        <TextField
          hintText="Confirm Password"
          floatingLabelText="Confirm Password"
          type='password'
          onChange={props.validate}
        />
      </div>
      <br/><br/>
      <div>
        <button type="submit" disabled={props.pristine || props.submitting}>Submit</button>
        <button type="button" disabled={props.pristine || props.submitting} onClick={props.reset}>Clear Values
        </button>
      </div>
    </form>
  );
};

SignUp.propTypes = {
  onSubmit: PropTypes.func,
  pristine: PropTypes.func,
  submitting: PropTypes.func,
  reset: PropTypes.func,
  validate: PropTypes.func
};

export default SignUp;
