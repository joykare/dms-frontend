import React, {PropTypes} from 'react';
import Menu from '../../components/Documents/Menu';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as documentActions from '../../actions/documentActions';

class MenuContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.props.documentActions.setFilter(value);
  }

  render() {
    return (
      <Menu docFilter={this.props.documents.get('docFilter')}
            onChange={this.handleChange}/>
    );
  }
}

MenuContainer.propTypes = {
  documents: PropTypes.object,
  documentActions: PropTypes.object
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
