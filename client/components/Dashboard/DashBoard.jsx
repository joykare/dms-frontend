import React from 'react';
import AppBar from '../Appbar/AppBar';
import ToolBar from '../Appbar/ToolBar';

import Documents from '../Documents/DocumentList';

const DashBoard = () => {
  return (
    <div>
      <div>
        <AppBar />
        <ToolBar />
      </div>
      <div style={{paddingTop:70}}>
        <Documents />
        <Documents />
      </div>
    </div>
  );

};

export default DashBoard;
