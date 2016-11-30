import React from 'react';

import MenuContainer from '../../containers/Documents/MenuContainer';
import DocumentsContainer from '../../containers/Documents/DocumentContainer';
import CreateDocumentContainer from '../../containers/Documents/CreateDocumentContainer';
import UserContainer from '../../containers/User/UserContainer';

const DashBoard = () => {
  return (
    <div>
      <div>
        <UserContainer />
      </div>

      <div className= 'col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1' style={{paddingTop:10}}>
        <div style={{float: 'right'}}>
          <MenuContainer />
        </div>
        <div style={{paddingTop:40}}>
          <DocumentsContainer />
        </div>
      </div>

        <CreateDocumentContainer />
    </div>
  );
};

export default DashBoard;
