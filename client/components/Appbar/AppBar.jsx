import React, {PropTypes} from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Gravatar from 'react-gravatar';
import md5 from 'blueimp-md5';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import {ListItem} from 'material-ui/List';

const NavBar = (props) => {
  return (
    <div>
    <AppBar
      title="Doc~sy"
      titleStyle={{color: 'white'}}
      iconStyleLeft={{color: 'white'}}
      onLeftIconButtonTouchTap={props.openDrawer}
      iconElementRight={
        <span>
          <FlatButton label="LOGOUT" style={{color: props.muiTheme.palette.alternateTextColor}}/>
        </span>
      }
    />

    <Drawer
      docked={false}
      width={300}
      open={props.isOpen.open}
      onRequestChange={props.onClose}
    >

    <span>
      <Gravatar email={md5(props.auth.email)} style={{marginLeft: '15%', paddingTop: 50}} size={200} rating="pg" default="identicon" className="CustomAvatar-image" />
      <br/> <br/>
      <div style={{textAlign: 'center'}}>
        {props.auth.name.first}  {props.auth.name.last}
        <br/><br/>
        {props.auth.email}
        <br/><br/>
        {props.auth.role.title}
      </div>
    </span>
    <br />
    <Divider/>
    <br/> <br/>
    <h4>Users:</h4>
     {props.users && props.users.length
      ? props.users.map((user)=>
      (
        <ListItem
        key={user._id}
        primaryText={user.username}
        onTouchTap={props.onClose}
        leftAvatar={<Gravatar email={md5(user.email)}  size={40} rating="pg" default="identicon" className="CustomAvatar-image" />}
      />
      ))
      : <span> No users found </span>
    }
    </Drawer>

    </div>
  );
};

NavBar.propTypes = {
  auth: PropTypes.object,
  users: PropTypes.array,
  muiTheme: PropTypes.object,
  openDrawer: PropTypes.func,
  onClose: PropTypes.func,
  isOpen: PropTypes.object
};


export default  muiThemeable()(NavBar);
