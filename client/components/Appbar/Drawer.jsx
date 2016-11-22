import React, {PropTypes} from 'react';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

const DrawerComp = (props) => {
  return (
    <Drawer
      docked={false}
      width={300}
      open={props.isOpen.open}
      onRequestChange={props.onClose}
    >

    <span> Hey {props.auth.user.username}</span>

    </Drawer>
  );
};

DrawerComp.propTypes = {
  auth: PropTypes.object,
  users: PropTypes.array,
  muiTheme: PropTypes.object,
  openDrawer: PropTypes.func,
  onClose: PropTypes.func,
  isOpen: PropTypes.object
};

export default DrawerComp;
// <Divider/>
//  {
//   props.users && props.users.length
//   ? props.users.map((user)=>{
//     return (
//     <MenuItem key={user._id} onTouchTap={props.onClose}>{user.username}</MenuItem>
//     )}
//   )
//   : <span> No users found </span>
// }
