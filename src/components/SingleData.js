import React from 'react';
import './SingleData.css';

function SingleData({ type = 'number', title, value }) {
  return (
    <p className="SingleData">
      <span className="title">{title}:</span>
      <span className="data">{value}</span>
    </p>
  );
}

export default SingleData;
