import React from 'react';

import MenuContainer from '../../containers/Documents/MenuContainer';
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
      <MenuContainer />
      </div>
      <div style={{paddingTop:70}}>
        <DocumentsContainer />
      </div>

        <CreateDocumentContainer />
    </div>
  );

};

export default DashBoard;
