import { forwardRef } from 'react';
import './Select.css';

const Select = forwardRef(
  (
    { id = 'continents', title = 'continent', data = [], onChange, value },
    ref
  ) => {
    const options = data.map((item, index) => {
      const value = id === 'continents' ? index : item;

      return (
        <option key={index + '' + item} value={value}>
          {item}
        </option>
      );
    });

    return (
      <div className="Select">
        <label htmlFor={id}>{title}:</label>
        <select
          ref={ref}
          name={title}
          id={id}
          onChange={onChange}
          value={value}
        >
          {options}
        </select>
      </div>
    );
  }
);

export default Select;
