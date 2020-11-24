import React from 'react';
import './Data.css';
import SingleData from './SingleData';
import SingleDataSkeleton from './Skeletons/SingleDataSkeleton';
const propertiesToFormatAsDate = ['updated'];

function formatAsDate(key) {
  return propertiesToFormatAsDate.includes(key);
}

function Data({ isLoading, data = {}, keyPrefix = '', keySuffix = '', title }) {
  const component = Object.entries(data).map(item => {
    const propertyKey = item[0];
    const title = propertyKey; // temporary
    const key = `${keyPrefix}-${title}-${keySuffix}`;
    let propertyValue = item[1];
    let dataType = 'number';

    if (formatAsDate(propertyKey)) dataType = 'date';

    if (isLoading) return <SingleDataSkeleton key={key} _key={key} />;

    return (
      <SingleData
        key={key}
        title={title}
        value={propertyValue}
        type={dataType}
      />
    );
  });

  return (
    <div className="Data">
      <h4 className="data-title">{title}</h4>
      {component}
    </div>
  );
}

export default Data;
