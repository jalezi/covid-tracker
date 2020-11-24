import React from 'react';
import SingleData from './SingleData';
import { utilities } from '../utils';

const propertiesToFormatAsDate = ['updated'];

function formatAsDate(key) {
  return propertiesToFormatAsDate.includes(key);
}

function DataComponent({ data = {}, keyPrefix = '' }) {
  const component = Object.entries(data).map(item => {
    const propertyKey = item[0];
    const title = propertyKey; // temporary
    const key = `${keyPrefix}-${title}`;
    let propertyValue = item[1];

    if (formatAsDate(propertyKey))
      propertyValue = utilities.formatDate.date_EN()(propertyValue);

    return <SingleData key={key} title={title} value={propertyValue} />;
  });

  // console.log('<DataComponent> component: ', component);

  return component;
}

export default DataComponent;
