import React from 'react';
import './DataCard.css';
import useFetch from '../hooks/useFetch';
import OneCard from './OneCard';
import MultiCard from './MultiCard';

function DataCard({
  url,
  params,
  title,
  keyPrefix,
  multi = false,
  isWorld = false,
}) {
  const { data, isLoading, hasError, errorMessage, refetch } = useFetch(
    url,
    params
  );

  if (hasError) {
    console.error(errorMessage);
    return <div>Somenthing went wrong!</div>;
  }

  const component = multi ? (
    <MultiCard
      data={data}
      isLoading={isLoading}
      keyPrefix={keyPrefix}
      keySuffixPrepend={title}
    />
  ) : (
    <OneCard
      data={data}
      isLoading={isLoading}
      keyPrefix={keyPrefix}
      keySuffixPrepend={title}
      isWorld={isWorld}
    />
  );

  return (
    <article className="DataCard">
      <header className="article-header">
        <h3 className="article-title">{title}</h3>
        <button onClick={refetch}>refresh</button>
      </header>
      {component}
    </article>
  );
}

export default DataCard;
