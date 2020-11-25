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
  const isNotValidPAth = !PATHS.includes(get);
  if (isNotValidPAth)
    throw new Error(`prop <get> should be one of: ${PATHS.toString()}`);

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
      <DataCard url={url} title="today" keyPrefix="today" />
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
        />
      ) : null}
      {expand2 ? (
        <DataCard
          url={url}
          params={twoDaysAgoParams}
          title="two days ago"
          keyPrefix="two-days-ago"
        />
      ) : null}
    </section>
  );
}

export default Card;
