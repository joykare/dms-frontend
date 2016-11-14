import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as documentActions from '../../actions/documentActions';
import DocumentList from '../../components/Documents/DocumentList';

class DocumentContainer extends React.Component {
  constructor(props) {
    super(props);
    console.log('props', this.props);
  }

  componentDidMount() {
    this.props.documentActions.fetchDoc();
  }

  render() {
    return (
      <DocumentList documents={this.props.documents.get('doc_list').toJS()}/>
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
