import React from 'react';
import './DataCard.css';
import useFetch from '../hooks/useFetch';
import OneCard from './OneCard';

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
