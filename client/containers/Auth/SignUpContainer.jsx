import React from 'react';
import SignUp from '../../components/Auth/SignUp.jsx';

export default class SignUpContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleValidate =this.handleValidate.bind(this);
    this.handleSubmit =this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleReset() {

  }

  handleValidate() {

  }

  handleSubmit() {

  }

  render() {
    return (
      <SignUp validate={this.handleValidate}
            onSubmit={this.handleSubmit}
            reset={this.handleReset}/>
    );
  }
}
