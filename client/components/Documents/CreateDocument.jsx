import React, {PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


const CreateDocument = (props) => {
  const actions = [
    <FlatButton
      label='Cancel'
      primary={true}
      onTouchTap={props.onClose}
    />,
    <FlatButton
      label='Submit'
      primary={true}
      keyboardFocused={true}
      onTouchTap={props.onSubmit}
    />,
  ];

  return (
    <div>
      <FloatingActionButton iconStyle={{fill: 'white'}} onTouchTap={props.onCreate} primary={true} style={{position: 'fixed', bottom: 20, right: 20}} zdepth={3}>
        <ContentAdd />
      </FloatingActionButton>
      <Dialog
        title= {props.document.isUpdatingDoc ? 'Edit Document' : 'Create Document'}
        actions={actions}
        modal={false}
        open={props.document.isShowingDialog}
        onRequestClose={props.onClose}
      >
        <TextField
          name='title'
          hintText='Title'
          floatingLabelText='Title'
          defaultValue={props.document.docContent.title}
          onChange={props.onChange}
        /><br />
        <TextField
          name='content'
          hintText='Content'
          floatingLabelText='Content'
          defaultValue={props.document.docContent.content}
          onChange={props.onChange}
          multiLine={true}
          fullWidth={true}
          rows={2}
          rowsMax={10}
        /><br />
        <SelectField
          floatingLabelText='Access Level'
          value={1}
        >
          <MenuItem value={1} primaryText='Public' />
          <MenuItem value={2} primaryText='Private' />
        </SelectField>
      </Dialog>
    </div>
  );
};

CreateDocument.propTypes = {
  document: PropTypes.object.isRequired,
  onCreate: PropTypes.func,
  isShowing: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func

};

export default CreateDocument;
