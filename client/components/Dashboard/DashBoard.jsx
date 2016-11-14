import React from 'react';
import AppBar from '../Appbar/AppBar';
import ToolBar from '../Appbar/ToolBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import DocumentsContainer from '../../containers/Documents/DocumentContainer';

const DashBoard = () => {
  return (
    <div>
      <div>
        <AppBar />
        <ToolBar />
      </div>
      <div style={{paddingTop:70}}>
        <DocumentsContainer />
      </div>
      <FloatingActionButton iconStyle={{fill: 'white'}} primary={true} style={{position: 'fixed', bottom: 20, right: 20}} zdepth={3}>
        <ContentAdd />
      </FloatingActionButton>
    </div>
  );

};

export default DashBoard;
