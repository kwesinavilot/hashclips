import { useState } from 'react';
import './styles/index.css';
import Heading from "@/components/site/Heading";
import Footer from './components/site/Footer';
import Hero from './components/site/Hero';
import Generator from './components/site/Generator';

function App() {
  return (
    <div className="app">
      <Heading />

      <main className="flex-">
        <Hero />

        <Generator />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
