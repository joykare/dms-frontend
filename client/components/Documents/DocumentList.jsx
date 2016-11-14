import React, {PropTypes} from 'react';
import Document from './Document';

const DocumentList = (props) => {
  return (
    <div className='row'>

      {props.documents && props.documents.length
      ? props.documents.map((doc) => (
        <div className='col-xs-12' style={{padding: 30}}>
          <Document document={doc}/>
        </div>
      )) : <span> No docs found </span>}

    </div>

  );
};

DocumentList.propTypes = {
  documents: PropTypes.array.isRequired
};


export default DocumentList;
