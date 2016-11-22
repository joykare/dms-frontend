import React from 'react';

import Menu from '../Documents/Menu';
// import AppBar from '../Appbar/AppBar';
// import ToolBar from '../Appbar/ToolBar';
// import UserList from '../User/UserList';
import DocumentsContainer from '../../containers/Documents/DocumentContainer';
import CreateDocumentContainer from '../../containers/Documents/CreateDocumentContainer';
import UserContainer from '../../containers/User/UserContainer';

const DashBoard = () => {
  return (
    <div>
      <div>
        <UserContainer />
      </div>
      <div style={{paddingRight: 200, float: 'right'}}>
      <Menu/>
      </div>
      <div style={{paddingTop:70}}>
        <DocumentsContainer />
      </div>

        <CreateDocumentContainer />
    </div>
  );

};

export default DashBoard;
