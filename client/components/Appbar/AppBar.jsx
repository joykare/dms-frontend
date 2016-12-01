import React, {PropTypes} from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Gravatar from 'react-gravatar';
import md5 from 'blueimp-md5';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import InfoIcon from 'material-ui/svg-icons/action/info';

const NavBar = (props) => {
  const upperCaseFirst = (name) => {
    return name.replace(/[a-z]/, name[0].toUpperCase());
  };

  return (
    <div>
      <AppBar
        title="Doc~sy"
        titleStyle={{color: 'white'}}
        iconStyleLeft={{color: 'white'}}
        onLeftIconButtonTouchTap={props.openDrawer}
        iconElementRight={
          <span>
            <FlatButton label="LOGOUT" onClick={props.onLogOut}
              style={{color: props.muiTheme.palette.alternateTextColor}}/>
          </span>
        }
      />

      <Drawer
        docked={false}
        width={300}
        open={props.isOpen.open}
        onRequestChange={props.onClose}
        >

        <div style={{backgroundColor: props.muiTheme.palette.primary1Color}}>
          <Gravatar email={md5(props.auth.email)}
            style={{padding: 12, marginTop: 20}} size={80} rating="pg"
            default="identicon" className="CustomAvatar-image" />
          <br/>
          {props.auth.name ?
            <p style={{margin: 12, fontSize: 14, fontWeight:500,
              color: props.muiTheme.palette.alternateTextColor}}>
                {upperCaseFirst(props.auth.name.first) + ' ' +
                upperCaseFirst(props.auth.name.last)}
            </p> : <p style={{margin: 12, fontSize: 14, fontWeight:500,
              color: props.muiTheme.palette.alternateTextColor}}>
                {props.auth.username}
            </p>
          }
          <p style={{margin: 12, fontSize: 14, fontWeight:500,
            color: props.muiTheme.palette.alternateTextColor}}>
              {props.auth.email}
          </p>
          <br/>
        </div>
        <Divider/>
        <List>
          <Subheader>View users:</Subheader>
          {props.users && props.users.length ?
            props.users.map((user) => (
              <ListItem
              key={user._id}
              primaryText={user.username}
              onTouchTap={() => props.onSelectUser(user)}
              rightIcon={<InfoIcon />}
              leftAvatar={<Gravatar email={md5(user.email)} size={40}
                rating="pg" default="identicon" className="CustomAvatar-image" />}
              />
            ))
          : <span> No users found </span>
          }
        </List>
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
  onLogOut: PropTypes.func,
  onSelectUser: PropTypes.func,
  isOpen: PropTypes.object
};


export default  muiThemeable()(NavBar);
