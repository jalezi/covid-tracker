import React, { useState } from 'react';
import './Card.css';
import DataCard from './DataCard';
import { URL } from '../utils';
import { PATHS } from './../data/index';

const QUERY_PARAMS = {
  yesterday: { yesterday: true },
  twoDaysAgo: { twoDaysAgo: true },
};

const { yesterdayParams } = QUERY_PARAMS;

const { twoDaysAgoParams } = QUERY_PARAMS;

function Card({ get = 'world', title = 'title' }) {
  const isNotValidPath = !PATHS.includes(get);
  if (isNotValidPath)
    throw new Error(`prop <get> should be one of: ${PATHS.toString()}`);

  const isMultiCard = ['continents'].includes(get);

  const [expand1, setExpand1] = useState(false);
  const [expand2, setExpand2] = useState(false);

  const urlKey = `${get.toUpperCase()}_URL`;
  const url = URL[urlKey];

  const handleExpand1 = () => {
    setExpand1(prev => !prev);
    if (expand2) setExpand2(false);
  };
  const handleExpand2 = () => {
    setExpand2(prev => !prev);
    if (expand1) setExpand1(false);
  };

  return (
    <section className="Card">
      <header>
        <h2 className="card-title">{title}</h2>
      </header>
      <DataCard url={url} title="today" keyPrefix="today" multi={isMultiCard} />
      <div className="buttons">
        <button onClick={handleExpand1}>yesterday</button>
        <button onClick={handleExpand2}>two days ago</button>
      </div>
      {expand1 ? (
        <DataCard
          url={url}
          params={yesterdayParams}
          title="yesterday"
          keyPrefix="yesterday"
          multi={isMultiCard}
        />
      ) : null}
      {expand2 ? (
        <DataCard
          url={url}
          params={twoDaysAgoParams}
          title="two days ago"
          keyPrefix="two-days-ago"
          multi={isMultiCard}
        />
      ) : null}
    </section>
  );
}

export default Card;
