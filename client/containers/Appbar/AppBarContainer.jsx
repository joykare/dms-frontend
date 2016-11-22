import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userActions from '../../actions/userActions';
import UserList from '../../components/User/UserList';
import React, {PropTypes} from 'react';
import NavBar from '../../components/Appbar/AppBar';

class AppBarContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.userActions.fetchAllUsers();
  }
  render() {
    return (
      <NavBar />
    );
  }
}

AppBarContainer.propTypes = {
  userActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBarContainer);
