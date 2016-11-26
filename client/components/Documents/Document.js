import React, {PropTypes} from 'react';
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Gravatar from 'react-gravatar';
import md5 from 'blueimp-md5';
import Chip from 'material-ui/Chip';

const Document = (props) => {
  return (
    <Card>
     <CardHeader
      textStyle={{paddingLeft:10, verticalAlign:'middle'}}
      title= {props.document.ownerName}
      subtitle= {props.document.roleTitle}
     >
      <Gravatar email={md5(props.document.ownerEmail)} style={{float:'left'}} size={50} rating="pg" default="identicon" className="CustomAvatar-image" />
      {props.showEditMenu ?
        <IconMenu
        style={{float:'right'}}
         iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
         anchorOrigin={{horizontal: 'right', vertical: 'top'}}
         targetOrigin={{horizontal: 'right', vertical: 'top'}}
         >
         <MenuItem primaryText="Edit Document" onTouchTap={() => props.onUpdate(props.document)}/>
         <MenuItem primaryText="Delete Document" onTouchTap={() => props.onDelete(props.document)}/>
       </IconMenu> : <span></span>
      }

     </CardHeader>
     <CardTitle title={props.document.title} />
     <Chip style={{margin:10}}>
         {props.document.accessLevel}
       </Chip>

     <CardText>
       {props.document.content}
     </CardText>
   </Card>
  );
};

Document.propTypes = {
  document: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    role: PropTypes.string,
    ownerId: PropTypes.string,
    ownerEmail: PropTypes.string,
    ownerName: PropTypes.string,
    roleTitle: PropTypes.string,
    accessLevel: PropTypes.string
  }),
  showEditMenu: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func
};

export default Document;
