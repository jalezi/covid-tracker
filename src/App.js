import './App.css';
import Card from './components/Card';
import Header from './components/Header';
import Footer from './components/Footer';
import { useLayoutEffect, useRef, useState } from 'react';
import Country from './components/Country';
import ContinentProvider from './context/continents';
import LocationProvider from './context/location';

function App() {
  const [state, setState] = useState({ radio1: false, radio2: false });

  const ourRef = useRef(null);

  useLayoutEffect(() => {
    let isScrolling;
    const header = document.querySelector('.Header');
    const footer = document.querySelector('.Footer');
    const onScroll = () => {
      header.style.opacity = 0.2;
      footer.style.opacity = 0.2;
      window.clearTimeout(isScrolling);

      isScrolling = setTimeout(function () {
        header.style.opacity = 1;
        footer.style.opacity = 1;
      }, 100);
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onChange = event => {
    const id = event.target.id;
    setState(prev => {
      const newState = { radio1: false, radio2: false };
      newState[id] = event.target.checked;
      const inputs = [...document.querySelectorAll('input')];
      inputs.forEach(input => {
        input.checked = newState[input.id];
      });
      return { ...prev, ...newState };
    });
  };

  return (
    <div className="App">
      <Header />
      <main ref={ourRef}>
        <div className="switch">
          <input
            id="radio1"
            name="radio1"
            type="checkbox"
            onChange={onChange}
          />
          <input
            id="radio2"
            name="radio2"
            type="checkbox"
            onChange={onChange}
          />
        </div>
        <ContinentProvider>
          <LocationProvider>
            <Country />
          </LocationProvider>
        </ContinentProvider>

        <Card
          get="world"
          title="global"
          labelFor="radio1"
          show={state.radio1}
        ></Card>
        <Card
          get="continents"
          title="continents"
          labelFor="radio2"
          show={state.radio2}
        ></Card>
      </main>
      <Footer />
    </div>
  );
}

export default App;
