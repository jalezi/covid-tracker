import React from 'react';
import './SingleData.css';
import { utilities } from '../utils';

function SingleData({ type = 'number', title, value = 0, locales = 'en-US' }) {
  let renderValue = value;

  if (type === 'date')
    renderValue = utilities.formatDate.date_EN()(renderValue);

  if (type === 'number') renderValue = value.toLocaleString(locales);

  return (
    <p className="SingleData">
      <span className="title">{title}:</span>
      <span className="data">{renderValue}</span>
    </p>
  );
}

export default SingleData;
