import React, {PropTypes} from 'react';
import ProfilePage from '../../components/User/ProfilePage';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userActions from '../../actions/userActions';

class ProfilePageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleEditToggle= this.handleEditToggle.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
    this.handleChange= this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleEditToggle() {
    this.props.userActions.editUserToggle();
  }

  handleClose() {
    this.props.userActions.closeUserToggle();
  }

  handleSubmit(user) {
    this.props.userActions.editUser(user);
  }

  handleChange(event) {
    event.preventDefault();
    let user = this.props.users.get('userDetails');
    user = user.set(event.target.name, event.target.value);
    this.props.userActions.userUpdateRequest(user.toJS());
  }

  render() {
    return (
      <ProfilePage documents={this.props.users.get('documents').toJS()}
                    userStateInfo={this.props.users.toJS()}
                    onClose={this.handleClose}
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                    user={this.props.users.get('userDetails').toJS()}
                    editUserToggle={this.handleEditToggle}/>
    );
  }
}

ProfilePageContainer.propTypes = {
  users: PropTypes.object,
  userActions: PropTypes.object
};

function mapStateToProps(state) {
  return {
    users: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePageContainer);
