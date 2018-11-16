import React, { Component } from 'react';

import '../App.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer';
import Verify from '../components/Verify';


class App extends Component { 


  render() {
    return (
      <div>
        <Header />
        <Verify />
        <Footer />
      </div>
    );
  }
}

export default App;