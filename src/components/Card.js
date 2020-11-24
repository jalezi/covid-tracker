import React from 'react';
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
  return (
    <section className="Card">
      <header>
        <h2 className="card-title">{title}</h2>
      </header>
      <World url={URL.WORLD_ALL_URL} title="today" keyPrefix="today" />
      <World
        url={URL.WORLD_ALL_URL}
        params={yesterdayParams}
        title="yesterday"
        keyPrefix="yesterday"
      />
      <World
        url={URL.WORLD_ALL_URL}
        params={twoDaysAgoParams}
        title="two days ago"
        keyPrefix="two-days-ago"
      />
    </section>
  );
}

export default Card;
