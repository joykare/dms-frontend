import React, {PropTypes} from 'react';
import Document from './Document';
// import UserList from '../User/UserList';

const DocumentList = (props) => {
  console.log(props);
  return (
    <div>
      <div className='col-xs-12'>
      {props.documents && props.documents.length
      ? props.documents.map((doc) => {
        return (
        <div style={{paddingTop: 30, paddingLeft:200, paddingRight:200}} key={doc._id}>
          <Document document={doc}
                    onUpdate={props.onUpdate}
                    onDelete={props.onDelete}
                    showEditMenu={props.showEditMenu(doc)}/>
        </div>
      ) }): <span> No docs found </span>}
      </div>
    </div>
  );
};

DocumentList.propTypes = {
  userDetails: PropTypes.func,
  documents: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  showEditMenu: PropTypes.bool
};


export default DocumentList;
