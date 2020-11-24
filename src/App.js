import './App.css';
import Card from './components/Card';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Card title="world"></Card>
      </main>
      <Footer />
    </div>
  );
}

export default App;
