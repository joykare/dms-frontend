import React from 'react';
import Paper from 'material-ui/Paper';


const UserList = (props) => {
  return (
    {props.users && props.users.length
      ? props.users.map((user)=>{
        log
        let name = {user.name.first} + ' ' + {user.name.last}
        return (
        <MenuItem onTouchTap={props.onClose}>{name}</MenuItem>
      )}) : <span> No users found </span>
    }
  )

export default UserList;
