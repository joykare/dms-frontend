import React, {PropTypes} from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';

const ToolBar = () => {
  return (
    <Toolbar style={{backgroundColor: '#EDE7F6'}}>
      <ToolbarGroup firstChild={true} style={{paddingLeft: 10}}>
        <h4 style={{marginTop: 18}}>DashBoard</h4>
        <ToolbarSeparator />

      </ToolbarGroup>
    </Toolbar>
  ) ;
};

ToolBar.propTypes = {
  value: PropTypes.number,
  handleChange: PropTypes.func,
};
export default ToolBar;
