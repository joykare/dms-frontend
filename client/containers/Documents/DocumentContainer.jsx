import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as documentActions from '../../actions/documentActions';
import CircularProgress from 'material-ui/CircularProgress';
import DocumentList from '../../components/Documents/DocumentList';

class DocumentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.toggleUpdateDocument = this.toggleUpdateDocument.bind(this);
    this.toggleDeleteDocument = this.toggleDeleteDocument.bind(this);
    this.handleEditingMenu = this.handleEditingMenu.bind(this);
    this.handleDisplayDocuments = this.handleDisplayDocuments.bind(this);
  }

  componentDidMount() {
    this.props.documentActions.fetchDoc();
  }

  toggleUpdateDocument(doc) {
    this.props.documentActions.toggleUpdateDocument(doc);
  }

  toggleDeleteDocument(doc) {
    this.props.documentActions.toggleDeleteDocument(doc);
  }

  handleVisibilty(documents, filter) {
    if (filter === 'all') {
      return documents;
    }
    return (
      documents.filter((document)=>(
        document.accessLevel ===  filter
      ))
    );
  }

  handleDisplayDocuments() {
    return (
      this.props.selectedDocuments
      ?
      this.props.selectedDocuments : this.handleVisibilty(
        this.props.documents.get('docList').toJS(), this.props.documents.get('docFilter'))
    );
  }

  handleEditingMenu(doc){
    const loggedUser = this.props.auth.getIn(['user', 'user']).toJS();
    return (
      loggedUser && loggedUser.role.title === 'admin' || loggedUser._id === doc.ownerId
    );
  }

  render() {
    return (
      this.props.documents.get('isFetching') ?
        <CircularProgress size={80} thickness={5} /> :
        <DocumentList documents={this.handleDisplayDocuments()}
                      auth={this.props.auth.get('user').toJS()}
                      onUpdate={this.toggleUpdateDocument}
                      onDelete={this.toggleDeleteDocument}
                      showEditMenu={this.handleEditingMenu}/>

    );
  }
}

DocumentContainer.propTypes = {
  documentActions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  documents: PropTypes.object.isRequired,
  selectedDocuments: PropTypes.array
};

function mapStateToProps(state){
  return {
    documents: state.documents,
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch){
  return {
    documentActions: bindActionCreators(documentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentContainer);
