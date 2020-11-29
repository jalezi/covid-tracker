import React from 'react';
import './Data.css';
import SingleData from './SingleData';
import SingleDataSkeleton from './Skeletons/SingleDataSkeleton';
import { utilities } from '../utils';

const propertiesToFormatAsDate = ['updated'];

function formatAsDate(key) {
  return propertiesToFormatAsDate.includes(key);
}

function Data({ isLoading, data = {}, keyPrefix = '', keySuffix = '', title }) {
  const component = Object.entries(data).map(item => {
    const propertyKey = item[0];
    const title = utilities.fromCamelCase(propertyKey, ' ');
    const key = `${keyPrefix}-${title}-${keySuffix}`;
    let propertyValue = item[1];
    let dataType = 'number';

    if (formatAsDate(propertyKey)) dataType = 'date';

    const isUndefined = typeof propertyValue === 'undefined';
    const isNumber = typeof propertyValue === 'number';

    if (isLoading) {
      return <SingleDataSkeleton key={key} title={title} />;
    }

    if (!isLoading && isUndefined) {
      return <SingleDataSkeleton key={key} title={title} />;
    }

    if (!isLoading && !isNumber) {
      return null;
    }

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
