import React, {PropTypes} from 'react';
import ProfilePage from '../../components/User/ProfilePage';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userActions from '../../actions/userActions';
import * as authActions from '../../actions/authActions';

class ProfilePageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleEditToggle= this.handleEditToggle.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
    this.handleChange= this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShowEdit = this.handleShowEdit.bind(this);
    this.handleTitleTouch = this.handleTitleTouch.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleTitleTouch() {
    this.context.router.push('/home');
  }

  handleEditToggle() {
    this.props.userActions.editUserToggle();
  }

  handleShowEdit(user) {
    const loggedUser = this.props.auth.getIn(['user', 'user']).toJS();
    return(
      loggedUser && loggedUser.role.title === 'admin' || loggedUser._id === user._id
    );
  }

  handleLogOut() {
    this.props.authActions.logoutUser();
    this.context.router.push('/');
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
                    auth={this.props.auth.getIn(['user', 'user']).toJS()}
                    userStateInfo={this.props.users.toJS()}
                    onClose={this.handleClose}
                    onChange={this.handleChange}
                    onLogOut={this.handleLogOut}
                    onSubmit={this.handleSubmit}
                    canEdit={this.handleShowEdit}
                    onTitleTouchTap={this.handleTitleTouch}
                    user={this.props.users.get('userDetails').toJS()}
                    editUserToggle={this.handleEditToggle}/>
    );
  }
}

ProfilePageContainer.propTypes = {
  users: PropTypes.object,
  auth: PropTypes.object,
  userActions: PropTypes.object,
  authActions: PropTypes.object
};

ProfilePageContainer.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  return {
    users: state.user,
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePageContainer);
