import React from 'react';
import './Select.css';

function Select({
  id = 'continents',
  title = 'continent',
  data = [],
  onChange,
}) {
  const options = data.map((continent, index) => {
    return (
      <option key={index + '' + continent} value={index}>
        {continent}
      </option>
    );
  });

  return (
    <div className="Select">
      <label htmlFor={id}>{title}:</label>
      <select name={title} id={id} onChange={onChange}>
        {options}
      </select>
    </div>
  );
}

export default Select;
