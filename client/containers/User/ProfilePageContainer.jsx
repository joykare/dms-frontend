import React, {PropTypes} from 'react';
import ProfilePage from '../../components/User/ProfilePage';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userActions from '../../actions/userActions';
import * as authActions from '../../actions/authActions';
import Validator from 'validator';
import Snackbar from 'material-ui/Snackbar';

class ProfilePageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {}
    };
    this.handleEditToggle= this.handleEditToggle.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
    this.handleChange= this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShowEdit = this.handleShowEdit.bind(this);
    this.handleTitleTouch = this.handleTitleTouch.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.loadUserData = this.loadUserData.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.handleRole = this.handleRole.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
  }

  componentDidMount() {
    const users = this.props.users.toJS();
    if ((users.documents.length && users.users.length) === 0) {
      this.loadUserData(this.props.params._id);
    }
  }

  loadUserData(userId) {
    const user = {
      _id : userId
    };
    this.props.userActions.fetchUser(userId);
    this.props.userActions.fetchUserDocuments(user);
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
    this.updateUser(event.target.name, event.target.value);
  }

  handleRole(event, index, value) {
    this.updateUser('role', value);
  }

  updateUser(field, value) {
    let user = this.props.users.get('userDetails');
    user = user.set(field, value);
    this.props.userActions.userUpdateRequest(user.toJS());
  }

  handleValidate() {
    const user = this.props.users.get('userDetails').toJS();

    if (!Validator.isEmail(user.email)) {
      Object.assign({}, this.state, this.setState({errors: {email : 'Email is invalid'}}));
    }

    if (user.confirmPassword !== user.password) {
      Object.assign({}, this.state, this.setState({errors: {confirmPassword : 'Doesn\'t match password'}}));
    }
  }

  render() {
    return (
      <div>
        <ProfilePage documents={this.props.users.get('documents').toJS()}
                      auth={this.props.auth.getIn(['user', 'user']).toJS()}
                      userStateInfo={this.props.users.toJS()}
                      onClose={this.handleClose}
                      errors={this.state}
                      onBlur={this.handleValidate}
                      onChange={this.handleChange}
                      onLogOut={this.handleLogOut}
                      onRoleChange={this.handleRole}
                      onSubmit={this.handleSubmit}
                      canEdit={this.handleShowEdit}
                      onTitleTouchTap={this.handleTitleTouch}
                      user={this.props.users.get('userDetails').toJS()}
                      roles={this.props.roles.get('roles').toJS()}
                      editUserToggle={this.handleEditToggle}/>
        <Snackbar open={this.props.users.getIn(['snackBarState', 'open'])}
                  message={this.props.users.getIn(['snackBarState', 'message'])}
                  autoHideDuration={4000}/>
      </div>
    );
  }
}

ProfilePageContainer.propTypes = {
  params: PropTypes.object,
  users: PropTypes.object,
  roles: PropTypes.object,
  auth: PropTypes.object,
  userActions: PropTypes.object,
  authActions: PropTypes.object,
  loadUserData: PropTypes.func
};

ProfilePageContainer.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  return {
    users: state.user,
    auth: state.auth,
    roles: state.roles
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePageContainer);
