import React from 'react';
import LogIn from '../../components/Auth/LogIn';

export default class LogInContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange =this.handleChange.bind(this);
    this.handleSubmit =this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleReset() {

  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit() {

  }

  render() {
    return (
      <LogIn onChange={this.handleChange}
            onSubmit={this.handleSubmit}
            reset={this.handleReset}/>
    );
  }
}
