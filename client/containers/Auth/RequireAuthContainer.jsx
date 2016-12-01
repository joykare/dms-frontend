import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

import LandingPage from '../../components/Landingpage/LandingPage';

/**
 * Check whether a user is logged in using a Higher Order Component.
 * If the user is not logged in, render the UnauthenticatedHomeContainer,
 * otherwise, render the protected component.
 */
function RequireAuthContainer(Component) {
  const AuthenticationRequired = (props) => {
    const user = props.auth.getIn(['user', 'user']).toJS();
    if (user.isAuthenticated) {
      return <Component {...props} />;
    }
    return <LandingPage />;
  };

  AuthenticationRequired.propTypes = {
    auth: PropTypes.object
  };

  function mapStateToProps(state) {
    return {
      auth: state.auth
    };
  }

  return connect(mapStateToProps)(AuthenticationRequired);
}

export default RequireAuthContainer;
