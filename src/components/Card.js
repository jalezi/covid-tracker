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
      <h2 className="card-title">{title}</h2>
      <World url={URL.WORLD_ALL_URL} title="today" />
      <World
        url={URL.WORLD_ALL_URL}
        params={yesterdayParams}
        title="yesterday"
      />
      <World
        url={URL.WORLD_ALL_URL}
        params={twoDaysAgoParams}
        title="two days ago"
      />
    </section>
  );
}

export default Card;
