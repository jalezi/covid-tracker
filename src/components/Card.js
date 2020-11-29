import React, { useState } from 'react';
import './Card.css';
import DataCard from './DataCard';
import { URL } from '../utils';
import { IMPLEMENTED_API_PATHS } from './../data';
import { isNull } from '../utils/utilities';

const QUERY_PARAMS = {
  yesterday: { yesterday: true },
  twoDaysAgo: { twoDaysAgo: true },
};

const { yesterday: yesterdayParams } = QUERY_PARAMS;

const { twoDaysAgo: twoDaysAgoParams } = QUERY_PARAMS;

function Card({
  get = 'world',
  country = null,
  title = 'title',
  show = false,
  labelFor,
}) {
  const isNotValidPath = !IMPLEMENTED_API_PATHS.includes(get);
  if (isNotValidPath)
    throw new Error(
      `prop <get> should be one of: ${IMPLEMENTED_API_PATHS.toString()}`
    );

  const [expand1, setExpand1] = useState(true);
  const [expand2, setExpand2] = useState(false);
  const [expand3, setExpand3] = useState(false);
  const [flag, setFlag] = useState(null);

  const isWorld = get === 'world';

  const isMultiCard = ['continents'].includes(get);
  const urlKey = `${get.toUpperCase()}_URL`;

  const isCountry = get === 'countries' && !isNull(country);
  const url = isCountry ? `${URL[urlKey]}/${country}` : URL[urlKey];
  const skip = get === 'countries' && isNull(country);

  if (url === undefined) throw new Error('url is undefined');

  const handleExpand1 = () => {
    setExpand1(prev => !prev);
    if (expand2) setExpand2(false);
    if (expand3) setExpand3(false);
  };
  const handleExpand2 = () => {
    setExpand2(prev => !prev);
    if (expand1) setExpand1(false);
    if (expand3) setExpand3(false);
  };
  const handleExpand3 = () => {
    setExpand3(prev => !prev);
    if (expand1) setExpand1(false);
    if (expand2) setExpand2(false);
  };

  const Today = (
    <>
      <DataCard
        url={url}
        title="today"
        keyPrefix="today"
        multi={isMultiCard}
        isWorld={isWorld}
        skip={skip}
        setFlag={setFlag}
      />
      <div className="buttons">
        <button onClick={handleExpand2}>yesterday</button>
        <button onClick={handleExpand3}>two days ago</button>
      </div>
    </>
  );

  const Yesterday = (
    <>
      <DataCard
        url={url}
        params={yesterdayParams}
        title="yesterday"
        keyPrefix="yesterday"
        multi={isMultiCard}
        isWorld={isWorld}
        skip={skip}
        setFlag={setFlag}
      />
      <div className="buttons">
        <button onClick={handleExpand1}>today</button>
        <button onClick={handleExpand3}>two days ago</button>
      </div>
    </>
  );

  const TwoDaysAgo = (
    <>
      <DataCard
        url={url}
        params={twoDaysAgoParams}
        title="two days ago"
        keyPrefix="two-days-ago"
        multi={isMultiCard}
        isWorld={isWorld}
        skip={skip}
        setFlag={setFlag}
      />
      <div className="buttons">
        <button onClick={handleExpand1}>today</button>
        <button onClick={handleExpand2}>yesterday</button>
      </div>
    </>
  );

  const flagImg = flag?.dataObject?.flag ? (
    <img src={flag?.dataObject?.flag} alt={`${title} flag`} width="100" />
  ) : (
    <div style={{ width: '50px' }}></div>
  );

  return (
    <section className="Card">
      <header>
        <label htmlFor={labelFor}>
          {isCountry ? flagImg : null}
          <h2 className="card-title">{title}</h2>
        </label>
      </header>
      {show && expand1 ? Today : null}
      {show && expand2 ? Yesterday : null}
      {show && expand3 ? TwoDaysAgo : null}
    </section>
  );
}

export default Card;
