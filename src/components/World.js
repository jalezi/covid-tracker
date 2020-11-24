import React from 'react';
import './World.css';
import Data from './Data';
import useFetch from '../hooks/useFetch';
import { worldDataObject } from '../utils';

function World({ url, params, title }) {
  const {
    data,
    isLoading,
    hasError,
    errorMessage,
    updateUrl,
    updateParams,
    refetch,
  } = useFetch(url, params);

  if (isLoading) return <div>...loading</div>;

  if (hasError) return <div>{errorMessage}</div>;

  const basicData = worldDataObject.makeBasicData(data);
  const perMillionData = worldDataObject.makePerMillionData(data);
  const perPersonData = worldDataObject.makePerPersonData(data);

  return (
    <article className="World">
      <h3 className="article-title">{title}</h3>
      <Data data={basicData.dataObject} title="basic" />
      <Data data={perMillionData.dataObject} title="per million" />
      <Data data={perPersonData.dataObject} title="per people" />
    </article>
  );
}

export default World;
