import React, {PropTypes} from 'react';
import Document from './Document';

const DocumentList = (props) => {
  return (
    <div className='row'>

      {props.documents && props.documents.length
      ? props.documents.map((doc) => (
        <div className='col-xs-12' style={{padding: 30}} key={doc._id}>
          <Document document={doc}
                    onUpdate={props.onUpdate}
                    onDelete={props.onDelete}/>
        </div>
      )) : <span> No docs found </span>}

    </div>

  );
};

DocumentList.propTypes = {
  documents: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};


export default DocumentList;
