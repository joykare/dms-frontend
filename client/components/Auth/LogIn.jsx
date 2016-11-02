import React, {PropTypes} from 'react';
import TextField from 'material-ui/TextField';

const LogIn = (props) => {
  return (
    <form onSubmit={props.handleSubmit} style={{textAlign:'center'}}>
      <div>
        <TextField
          hintText="Email"
          floatingLabelText="Email"
        />
      </div>
      <div>
        <TextField
          hintText="Password"
          floatingLabelText="Password"
          type='password'
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

LogIn.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.func,
  submitting: PropTypes.func,
  reset: PropTypes.func
};

export default LogIn;
