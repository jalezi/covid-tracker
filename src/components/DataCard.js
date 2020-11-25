import React from 'react';
import './DataCard.css';
import useFetch from '../hooks/useFetch';
import OneCard from './OneCard';

function MultiCard({ isLoading, data, keyPrefix, keySuffixPrepend }) {
  const _data = data ?? [{ continent: 'continent' }];

  const components = _data.map(item => (
    <>
      <header>
        <h3 className="article-title">{item.continent.toUpperCase()}</h3>
      </header>
      <OneCard
        data={item}
        isLoading={isLoading}
        keyPrefix={keyPrefix}
        keySuffixPrepend={`${keySuffixPrepend}-${item.continent}`}
      />
    </>
  ));

  return <>{components}</>;
}

function DataCard({ url, params, title, keyPrefix, multi = false }) {
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
    />
  );

  return (
    <article className="DataCard">
      <header>
        <h3 className="article-title">{title}</h3>
        <button onClick={refetch}>refresh</button>
      </header>
      {component}
    </article>
  );
}

export default DataCard;
