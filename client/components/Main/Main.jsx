import React, {PropTypes} from 'react';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const Main = (props) => (
  <MuiThemeProvider >
    {props.children}
  </MuiThemeProvider>
);

Main.propTypes = {
  children: PropTypes.node
};


export default Main;
