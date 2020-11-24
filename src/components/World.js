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
      <h3>{title}</h3>
      <h3>Basic</h3>
      <Data data={basicData.dataObject} />
      <h3>Per Million</h3>
      <Data data={perMillionData.dataObject} />
      <h3>Per People</h3>
      <Data data={perPersonData.dataObject} />
    </article>
  );
}

export default World;
