import React from 'react';
import './World.css';
import Data from './Data';
import useFetch from '../hooks/useFetch';
import { worldDataObject } from '../utils';

function World({ url, params, title, keyPrefix }) {
  const {
    data,
    isLoading,
    hasError,
    errorMessage,
    updateUrl,
    updateParams,
    refetch,
  } = useFetch(url, params);

  if (hasError) return <div>{errorMessage}</div>;

  let basicData = worldDataObject.makeBasicData({});
  let perMillionData = worldDataObject.makePerMillionData({});
  let perPersonData = worldDataObject.makePerPersonData({});

  if (!isLoading) {
    basicData = worldDataObject.makeBasicData(data);
    perMillionData = worldDataObject.makePerMillionData(data);
    perPersonData = worldDataObject.makePerPersonData(data);
  }

  return (
    <article className="World">
      <h3 className="article-title">{title}</h3>
      <button onClick={refetch}>refresh</button>

      <Data
        isLoading={isLoading}
        data={basicData.dataObject}
        title="basic"
        keyPrefix={keyPrefix}
        keySuffix={'world-basic'}
      />
      <Data
        isLoading={isLoading}
        data={perMillionData.dataObject}
        title="per million"
        keyPrefix={keyPrefix}
        keySuffix="world-per-million"
      />
      <Data
        isLoading={isLoading}
        data={perPersonData.dataObject}
        title="per people"
        keyPrefix={keyPrefix}
        keySuffix="world-per-people"
      />
    </article>
  );
}

export default World;
