import React from 'react';
import AppBar from '../Appbar/AppBar';
import ToolBar from '../Appbar/ToolBar';

import DocumentsContainer from '../../containers/Documents/DocumentContainer';
import CreateDocumentContainer from '../../containers/Documents/CreateDocumentContainer';

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
        <CreateDocumentContainer />
    </div>
  );

};

export default DashBoard;
