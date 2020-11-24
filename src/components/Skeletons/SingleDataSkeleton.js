import React from 'react';
import './SingleDataSkeleton.css';

function SingleDataSkeleton({ title }) {
  return (
    <p className="SingleDataSkeleton">
      <span className="title">{title}</span>
      <span className="data">value</span>
    </p>
  );
}

export default SingleDataSkeleton;
