import { useState } from 'react';
import './styles/index.css';
import Heading from "@/components/site/Heading";
import Footer from './components/site/Footer';

function App() {
  return (
    <div className="app">
      <Heading />

      <main className="main">
        <p>Hello World</p>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
