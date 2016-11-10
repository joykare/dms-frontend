import React, {PropTypes} from 'react';

const errorStyle = {
  fontSize: '0.8em',
  color: 'red'
};

const ValidationError = (props) =>{
  return (
    <span style={errorStyle}>
     {props.error} 
    </span>
  );
};

ValidationError.propTypes = {
  error: PropTypes.string
};

export default ValidationError;
