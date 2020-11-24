import './App.css';

import { URL, utilities } from './utils';
import World from './components/World';

const yesterdayParams = {
  yesterday: true,
};

const twoDaysAgoParams = {
  twoDaysAgo: true,
};

function App() {
  const formatStr = 'E, d. MMM yyyy';
  const today = new Date();
  const todayRender = utilities.formatDate.date_EN(formatStr)(today);

  return (
    <div className="App">
      <header>HEADER</header>
      <main>
        <h1>Covid tracker</h1>
        <p>From NOVEL CoVID19 API: disease.sh/v3/covid</p>
        <p>Date: {todayRender}</p>
        <section>
          <h2>World</h2>
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
      </main>
      <footer>FOOTER</footer>
    </div>
  );
}

export default App;
