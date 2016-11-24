import React, {PropTypes} from 'react';
import CreateDocument from '../../components/Documents/CreateDocument';
import ConfirmDelete from '../../components/Documents/ConfirmDelete';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as documentActions from '../../actions/documentActions';

class CreateDocumentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.toggleCreate = this.toggleCreate.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAccess = this.handleAccess.bind(this);
    this.updateDocument = this.updateDocument.bind(this);
  }

  toggleCreate() {
    this.props.documentActions.toggleCreateDocument();
  }

  handleClose() {
    this.props.documentActions.toggleClose();
  }

  handleAccess(event, index, value) {
    this.updateDocument('accessLevel', value);
  }

  updateDocument(field, value) {
    let document = this.props.documents.get('document');
    let docContent = document.get('docContent');
    docContent = docContent.set(field, value);

    if(document.get('isUpdatingDoc')){
      this.props.documentActions.docUpdateRequest(docContent.toJS());
    } else {
      this.props.documentActions.docCreateRequest(docContent.toJS());
    }
  }

  handleDelete() {
    let documentDetails = this.props.documents.get('document').toJS();
    this.props.documentActions.deleteDoc(documentDetails.docContent);

  }

  handleSubmit() {
    let documentDetails = this.props.documents.get('document').toJS();
    if(documentDetails.isUpdatingDoc) {
      this.props.documentActions.editDoc(documentDetails.docContent);
    } else {
      this.props.documentActions.createDoc(documentDetails.docContent);
    }
  }

  handleChange(event) {
    event.preventDefault();
    this.updateDocument(event.target.name, event.target.value);
  }

  render() {
    return (
      <div>
        <CreateDocument document={this.props.documents.get('document').toJS()}
                        onChange={this.handleChange}
                        onCreate={this.toggleCreate}
                        onClose={this.handleClose}
                        setAccess={this.handleAccess}
                        isShowing={this.state.open}
                        onSubmit={this.handleSubmit} />
        <ConfirmDelete document={this.props.documents.get('document').toJS()}
                        onDelete={this.handleDelete}
                        onClose={this.handleClose} />
      </div>
    );
  }
}

CreateDocumentContainer.propTypes = {
  documents: PropTypes.object.isRequired,
  documentActions: PropTypes.object.isRequired
};

CreateDocumentContainer.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state){
  return {
    documents: state.documents
  };
}

function mapDispatchToProps(dispatch){
  return {
    documentActions: bindActionCreators(documentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDocumentContainer);
