import React from 'react';
import './MultiCard.css';
import OneCard from './OneCard';

function MultiCard({ isLoading, data, keyPrefix, keySuffixPrepend }) {
  const _data = data ?? [{ continent: 'continent' }];

  const components = _data.map(item => (
    <section
      className="MultiCard"
      key={`section-${keySuffixPrepend}-${item.continent}`}
    >
      <header className="article-header">
        <h3 className="article-title">{item.continent.toUpperCase()}</h3>
      </header>
      <OneCard
        data={item}
        isLoading={isLoading}
        keyPrefix={keyPrefix}
        keySuffixPrepend={`${keySuffixPrepend}-${item.continent}`}
      />
    </section>
  ));

  return <>{components}</>;
}

export default MultiCard;
