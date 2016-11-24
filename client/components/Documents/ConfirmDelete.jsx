import React, {PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const ConfirmDelete = (props) => {
  const actions = [
    <FlatButton
      label='Cancel'
      primary={true}
      onTouchTap={props.onClose}
    />,
    <FlatButton
      label='Delete'
      primary={true}
      keyboardFocused={true}
      onTouchTap={props.onDelete}
    />,
  ];

  return (
    <div>
      <Dialog
        title='Confirm Delete'
        actions={actions}
        modal={false}
        open={props.document.confirmDelete}
        onRequestClose={props.onClose}
      >
        Are sure you want to delete? This action is irreversable. If unsure click on Cancel otherwise Delete.
      </Dialog>
    </div>
  );
};

ConfirmDelete.propTypes = {
  document: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func
};

export default ConfirmDelete;
