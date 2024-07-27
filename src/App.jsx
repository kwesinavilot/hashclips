import { useState } from 'react';
import './styles/index.css';
import Heading from "@/components/site/Heading";
import Footer from './components/site/Footer';
import Hero from './components/site/Hero';

function App() {
  return (
    <div className="app">
      <Heading />

      <main className="flex-">
        <Hero />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
