import React, {PropTypes} from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import muiThemeable from 'material-ui/styles/muiThemeable';

const NavBar = (props) => (
  <AppBar
    title="Doc~sy"
    titleStyle={{color: 'white'}}
    iconStyleLeft={{color: 'white'}}
    iconElementRight={
      <span>
        <FlatButton label="LOGOUT" style={{color: props.muiTheme.palette.alternateTextColor}}/>
      </span>
    }
  />
);

NavBar.propTypes = {
  muiTheme: PropTypes.Object
};


export default  muiThemeable()(NavBar);
