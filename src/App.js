import './App.css';
import Card from './components/Card';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Card title="world"></Card>
      </main>
      <footer>FOOTER</footer>
    </div>
  );
}

export default App;
