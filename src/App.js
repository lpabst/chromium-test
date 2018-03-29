import React, { Component } from 'react';
import router from './router';
import MainHeader from './components/MainHeader/MainHeader.js';

import './reset.css';
import './App.css';


class App extends Component {

  render() {
    return (
      <div className="App">
        {/* <MainHeader /> */}
        { router }

      </div>
    );
  }
}


export default App;
