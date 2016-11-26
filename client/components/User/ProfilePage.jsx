import React, {PropTypes} from 'react';
import {Card, CardActions, CardTitle, CardMedia, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Gravatar from 'react-gravatar';
import md5 from 'blueimp-md5';
import DocumentContainer from '../../containers/Documents/DocumentContainer';
import AppBar from 'material-ui/AppBar';
import CreateIcon from 'material-ui/svg-icons/content/create';

const ProfilePage = (props) => {
  return(
  <div>
    <AppBar
      showMenuIconButton={false}
    />
    <div className='row' style={{padding: 20}}>
    <div className='col-xs-4'>
      {!props.userStateInfo.isEditing ?
        <Card style={{width: 350, marginLeft: 200, marginTop: 40}}>
          <CardMedia
          overlay={<CardTitle title={props.user.username} />}
        >
          <Gravatar email={md5(props.user.email)} size={300} rating="pg" default="identicon" className="CustomAvatar-image" />
        </CardMedia>
          <CardText>
          </CardText>
          { props.canEdit(props.user) ?
          <CardActions>
            <FlatButton label='Edit Profile' onClick={props.editUserToggle} icon={<CreateIcon />} primary={true}/>
          </CardActions> : <span></span>
          }
        </Card> :
        <Card style={{width: 400, marginLeft: 200, marginTop: 40}}>
          <CardMedia
          overlay={<CardTitle title={props.user.username} />}
        >
          <Gravatar email={md5(props.user.email)} size={300} rating="pg" default="identicon" className="CustomAvatar-image" />
        </CardMedia>
          <CardText>
            <TextField
              hintText = "Username"
              floatingLabelText="Username"
              name='username'
              onChange={props.onChange}
              defaultValue={props.user.username}
            /><br/>
            <TextField
              hintText="Email"
              floatingLabelText="Email"
              name='email'
              onChange={props.onChange}
              defaultValue={props.user.email}
            /><br/>
            <TextField
              hintText="Password"
              floatingLabelText="Password"
              name='password'
              type='password'
              onChange={props.onChange}
            /><br/>
            <TextField
              hintText="Confirm Password"
              floatingLabelText="Confirm Password"
              name='confirmPassword'
              type='password'
              onChange={props.onChange}
            /><br/>
          </CardText>
          <CardActions>
            <FlatButton label='Submit' onClick={() => props.onSubmit(props.user)} primary={true}/>
            <FlatButton label='Cancel' onClick={props.onClose} primary={true}/>
          </CardActions>
        </Card>
      }
      </div>
      <div className='col-xs-8'>
        <DocumentContainer selectedDocuments={props.documents}/>/
      </div>
    </div>
  </div>
  );
};

ProfilePage.propTypes = {
  userStateInfo: PropTypes.object,
  documents: PropTypes.array,
  user: PropTypes.object,
  editUserToggle: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  canEdit: PropTypes.func
};

export default ProfilePage;
