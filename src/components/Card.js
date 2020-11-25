import React, { useState } from 'react';
import './Card.css';
import World from './World';
import { URL } from '../utils';

const yesterdayParams = {
  yesterday: true,
};

const twoDaysAgoParams = {
  twoDaysAgo: true,
};

function Card({ title = 'title' }) {
  const [expand1, setExpand1] = useState(false);
  const [expand2, setExpand2] = useState(false);

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
      <World url={URL.WORLD_ALL_URL} title="today" keyPrefix="today" />
      <div className="buttons">
        <button onClick={handleExpand1}>yesterday</button>
        <button onClick={handleExpand2}>two days ago</button>
      </div>
      {expand1 ? (
        <World
          url={URL.WORLD_ALL_URL}
          params={yesterdayParams}
          title="yesterday"
          keyPrefix="yesterday"
        />
      ) : null}
      {expand2 ? (
        <World
          url={URL.WORLD_ALL_URL}
          params={twoDaysAgoParams}
          title="two days ago"
          keyPrefix="two-days-ago"
        />
      ) : null}
    </section>
  );
}

export default Card;
