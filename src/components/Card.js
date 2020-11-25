import React, { useState, useEffect } from 'react';
import './Card.css';
import DataCard from './DataCard';
import { URL } from '../utils';
import { PATHS } from './../data/index';
import { isNull } from '../utils/utilities';

const QUERY_PARAMS = {
  yesterday: { yesterday: true },
  twoDaysAgo: { twoDaysAgo: true },
};

const { yesterdayParams } = QUERY_PARAMS;

const { twoDaysAgoParams } = QUERY_PARAMS;

function Card({ get = 'world', title = 'title', show = false, labelFor }) {
  const isNotValidPath = !PATHS.includes(get);
  if (isNotValidPath)
    throw new Error(`prop <get> should be one of: ${PATHS.toString()}`);

  const [expand1, setExpand1] = useState(false);
  const [expand2, setExpand2] = useState(false);

  const isMultiCard = ['continents'].includes(get);
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

  const Today = (
    <DataCard url={url} title="today" keyPrefix="today" multi={isMultiCard} />
  );

  const Yesterday = (
    <DataCard
      url={url}
      params={yesterdayParams}
      title="yesterday"
      keyPrefix="yesterday"
      multi={isMultiCard}
    />
  );

  const TwoDaysAgo = (
    <>
      <DataCard
        url={url}
        params={twoDaysAgoParams}
        title="two days ago"
        keyPrefix="two-days-ago"
        multi={isMultiCard}
      />
      <div className="buttons">
        <button onClick={handleExpand1}>yesterday</button>
        <button onClick={handleExpand2}>two days ago</button>
      </div>
    </>
  );

  return (
    <section className="Card">
      <header>
        <label htmlFor={labelFor}>
          <h2 className="card-title">{title}</h2>
        </label>
      </header>
      {show ? Today : null}
      {expand1 ? Yesterday : null}
      {expand2 ? TwoDaysAgo : null}
    </section>
  );
}

export default Card;
