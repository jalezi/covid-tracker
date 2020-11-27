import React from 'react';
import './Header.css';
import { utilities } from '../utils';

function Header() {
  const formatStr = 'E, d. MMM yyyy';
  const today = new Date();
  const todayRender = utilities.formatDate.date_EN(formatStr)(today);
  return (
    <header className="Header">
      <h1 className="header-title">Covid tracker</h1>
      <p>{todayRender}</p>
      <div className="header-link">
        Data collected from{' '}
        <a
          href="https://disease.sh/docs/#/COVID-19"
          target="_blank"
          rel="noreferrer"
        >
          NOVEL CoVID19 API
        </a>
      </div>
    </header>
  );
}

export default Header;
