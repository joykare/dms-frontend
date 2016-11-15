import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as documentActions from '../../actions/documentActions';
import DocumentList from '../../components/Documents/DocumentList';

class DocumentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.toggleUpdateDocument = this.toggleUpdateDocument.bind(this);
    this.toggleDeleteDocument = this.toggleDeleteDocument.bind(this);

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

  render() {
    return (
      <DocumentList documents={this.props.documents.get('docList').toJS()}
                    onUpdate={this.toggleUpdateDocument}
                    onDelete={this.toggleDeleteDocument}/>
    );
  }
}

DocumentContainer.propTypes = {
  documentActions: PropTypes.object.isRequired,
  documents: PropTypes.object.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(DocumentContainer);
