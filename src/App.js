import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.js';
import ProductList from './components/ProductList/ProductList.js';
import './App.css';

const App = () => {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <ProductList />
    </div>
    </Router>
  );
};

export default App;
