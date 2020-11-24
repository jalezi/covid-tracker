import './App.css';
import Card from './components/Card';
import { utilities } from './utils';

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
        <Card title="world"></Card>
      </main>
      <footer>FOOTER</footer>
    </div>
  );
}

export default App;
