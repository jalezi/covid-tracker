import React, { useState } from 'react';
import './DataCard.css';
import Data from './Data';
import useFetch from '../hooks/useFetch';
import { makeDataObjectFrom } from '../data';

function OneCard({ isLoading, data, keyPrefix, keySuffixPrepend }) {
  const [expand, setExpand] = useState(false);

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
    <>
      <Data
        isLoading={isLoading}
        data={basicData.dataObject}
        title="basic"
        keyPrefix={keyPrefix}
        keySuffix={`${keySuffixPrepend}-basic`}
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
            keySuffix={`${keySuffixPrepend}-per-million`}
          />
          <Data
            isLoading={isLoading}
            data={perPersonData.dataObject}
            title="per people"
            keyPrefix={keyPrefix}
            keySuffix={`${keySuffixPrepend}-per-people`}
          />
        </>
      ) : null}
    </>
  );
}

function DataCard({ url, params, title, keyPrefix }) {
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

  return (
    <article className="DataCard">
      <header>
        <h3 className="article-title">{title}</h3>
        <button onClick={refetch}>refresh</button>
      </header>
      <OneCard
        data={data}
        isLoading={isLoading}
        keyPrefix={keyPrefix}
        keySuffixPrepend={title}
      />
    </article>
  );
}

export default DataCard;
