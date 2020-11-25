import React, { useState } from 'react';
import './World.css';
import Data from './Data';
import useFetch from '../hooks/useFetch';
import { makeDataObjectFrom } from '../data';

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

  const [expand, setExpand] = useState(false);

  if (hasError) return <div>{errorMessage}</div>;

  let basicData = makeDataObjectFrom.makeBasicData({});
  let perMillionData = makeDataObjectFrom.makePerMillionData({});
  let perPersonData = makeDataObjectFrom.makePerPersonData({});

  if (!isLoading) {
    basicData = makeDataObjectFrom.makeBasicData(data);
    perMillionData = makeDataObjectFrom.makePerMillionData(data);
    perPersonData = makeDataObjectFrom.makePerPersonData(data);
  }

  const handleExpandClick = event => {
    const button = event.target;
    setExpand(prev => !prev);
    !expand ? (button.innerText = 'Less') : (button.innerText = 'More');
  };

  return (
    <article className="World">
      <header>
        <h3 className="article-title">{title}</h3>
        <button onClick={refetch}>refresh</button>
      </header>

      <Data
        isLoading={isLoading}
        data={basicData.dataObject}
        title="basic"
        keyPrefix={keyPrefix}
        keySuffix={'world-basic'}
      />
      <footer>
        <button onClick={handleExpandClick}>More</button>
      </footer>
      {expand ? (
        <>
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
        </>
      ) : null}
    </article>
  );
}

export default World;
