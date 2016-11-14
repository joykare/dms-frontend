import React, {PropTypes} from 'react';
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Avatar from 'material-ui/Avatar';

const Document = (props) => {
  return (
    <Card>
     <CardHeader
      avatar={
        <Avatar
          size={50}
          style={{margin: 5}}
        >
          J
        </Avatar>
      }
      textStyle={{paddingLeft:10, verticalAlign:'middle'}}
      title='Joy Warugu'
      subtitle='user'
     >
       <IconMenu
       style={{float:'right'}}
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        >
        <MenuItem primaryText="Edit Document" />
        <MenuItem primaryText="Delete Document" />
      </IconMenu>
     </CardHeader>
     <CardTitle title={props.document.title} />
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
    role: PropTypes.string
  })
};

export default Document;
