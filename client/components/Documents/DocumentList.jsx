import React, {PropTypes} from 'react';
import Document from './Document';

const DocumentList = (props) => {
  return (
    <div>
      <div className='col-xs-12'>
      {props.documents && props.documents.length
      ? props.documents.map((doc) => (
        <div style={{paddingTop: 30, paddingLeft:200, paddingRight:200}} key={doc._id}>
          <Document document={doc}
                    auth={props.auth}
                    onUpdate={props.onUpdate}
                    onDelete={props.onDelete}
                    showEditMenu={props.showEditMenu(doc)}/>
        </div>
      )): <div style={{paddingTop: 30, paddingLeft:200, paddingRight:200}}> No documents found </div>}
      </div>
    </div>
  );
};

DocumentList.propTypes = {
  userDetails: PropTypes.func,
  auth: PropTypes.object,
  documents: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  showEditMenu: PropTypes.func
};


export default DocumentList;
