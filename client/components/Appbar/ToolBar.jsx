import React, {PropTypes} from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';

const ToolBar = (props) => {
  return (
    <Toolbar>
      <ToolbarGroup firstChild={true}>
        <DropDownMenu value={1} onChange={props.handleChange} openImmediately={true}>
          <MenuItem value={1} primaryText='Overview' />
          <MenuItem value={2} primaryText='All Documents' />
          <MenuItem value={3} primaryText='Public Documents' />
          <MenuItem value={4} primaryText='My Documents' />
        </DropDownMenu>
      </ToolbarGroup>
      <ToolbarGroup>

        <ToolbarSeparator />
        <IconMenu
          iconButtonElement={
            <IconButton touch={true}>
              <NavigationExpandMoreIcon />
            </IconButton>
          }
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          style={{marginLeft:40}}
        >
          <MenuItem primaryText="My Profile" />
          <MenuItem primaryText="Refresh" />
        </IconMenu>
      </ToolbarGroup>
    </Toolbar>
  ) ;
};

ToolBar.propTypes = {
  value: PropTypes.number,
  handleChange: PropTypes.func,
};
export default ToolBar;
