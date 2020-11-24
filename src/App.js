import './App.css';
import Card from './components/Card';
import Header from './components/Header';
import Footer from './components/Footer';
import { useLayoutEffect, useRef } from 'react';

function App() {
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

  return (
    <div className="App">
      <Header />
      <main ref={ourRef}>
        <Card title="global"></Card>
        <Card title="world2"></Card>
      </main>
      <Footer />
      <div id="top-of-site-pixel-anchor"></div>
    </div>
  );
}

export default App;
