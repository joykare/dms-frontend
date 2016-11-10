import React, {PropTypes} from 'react';
import {deepPurple700, deepPurple600, white, darkBlack} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: deepPurple700,
    primary2Color: deepPurple600,
    textColor: darkBlack,
    alternateTextColor: white,
  },
  appBar: {
    height: 80
  },
});

const Main = (props) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    {props.children}
  </MuiThemeProvider>
);

Main.propTypes = {
  children: PropTypes.node
};


export default Main;
