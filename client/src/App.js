// src/App.js
import React from 'react';
import './App.css';
import ProductList from './components/ProductList';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Automotive E-Commerce</h1>
        <p>Quality Parts & Accessories</p>
      </header>
      <main>
        <ProductList />
      </main>
    </div>
  );
}

export default App;