import './App.css';
import Card from './components/Card';
import Header from './components/Header';
import Footer from './components/Footer';
import { useLayoutEffect, useRef, useState, useEffect } from 'react';

function App() {
  const ourRef = useRef(null);

  useLayoutEffect(() => {
    let isScrolling;
    const header = document.querySelector('.Header');
    const footer = document.querySelector('.Footer');
    const onScroll = () => {
      header.style.opacity = 0.2;
      footer.style.opacity = 0.2;
      // Clear our timeout throughout the scroll
      window.clearTimeout(isScrolling);

      // Set a timeout to run after scrolling ends
      isScrolling = setTimeout(function () {
        // Run the callback
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
        <Card title="world"></Card>
      </main>
      <Footer />
      <div id="top-of-site-pixel-anchor"></div>
    </div>
  );
}

export default App;
