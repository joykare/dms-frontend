import React, {PropTypes} from 'react';
import TextField from 'material-ui/TextField';

const LogIn = (props) => {
  return (
    <form style={{textAlign:'center'}}>
      <div>
        <TextField
          name="email"
          hintText="Email"
          floatingLabelText="Email"
          onChange={props.onChange}
        />
      </div>
      <div>
        <TextField
          name='password'
          hintText="Password"
          floatingLabelText="Password"
          type='password'
          onChange={props.onChange}
        />
      </div>
      <br/><br/>
      <div>
        <button type="button" onClick={props.onLogin} >Submit</button>
        <button type="button" onClick={props.reset}>Clear Values
        </button>
      </div>
    </form>
  );
};

LogIn.propTypes = {
  onLogin: PropTypes.func,
  onChange: PropTypes.func,
  pristine: PropTypes.func,
  submitting: PropTypes.func,
  reset: PropTypes.func
};

export default LogIn;