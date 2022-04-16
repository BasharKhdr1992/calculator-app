import React from 'react';
import './Key.css';

const Key = ({ text, styles, onClick, className }) => {
  return (
    <div
      onClick={() => onClick(text)}
      style={styles}
      className={`key ${className}`}
    >
      {text}
    </div>
  );
};

export default Key;
