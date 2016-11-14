import React, {PropTypes} from 'react';
import CreateDocument from '../../components/Documents/CreateDocument';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as documentActions from '../../actions/documentActions';

class CreateDocumentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  handleSubmit() {
    let documentDetails = this.props.documents.get('document').toJS();
    this.props.documentActions.createDoc(documentDetails.docContent);
    this.handleClose();
  }

  handleChange(event) {
    event.preventDefault();
    let document = this.props.documents.get('document');
    let docContent = document.get('docContent');
    docContent = docContent.set(event.target.name, event.target.value);
    this.props.documentActions.docUpdateRequest(docContent.toJS());
  }

  render() {
    return (
      <CreateDocument onChange={this.handleChange}
                      onOpen={this.handleOpen}
                      onClose={this.handleClose}
                      isShowing={this.state.open}
                      onSubmit={this.handleSubmit} />
    );
  }
}

CreateDocumentContainer.propTypes = {
  documents: PropTypes.object.isRequired,
  documentActions: PropTypes.object.isRequired
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
