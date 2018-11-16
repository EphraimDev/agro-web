import React, { Component } from 'react';

import '../App.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer';
import Login from '../components/Login';


class App extends Component { 


  render() {
    return (
      <div>
        <Header />
        <Login />
        <Footer />
      </div>
    );
  }
}

export default App;